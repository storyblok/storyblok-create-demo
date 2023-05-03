import { Command, Flags } from "@oclif/core";
import * as inquirer from "inquirer";
import * as chalk from "chalk";
import * as path from "path";
import * as fs from "fs";

import copy from "../lib/copy";
import prompts from "../lib/prompts";
import frameworks from "../lib/frameworks";
import clone from "../lib/clone";
import { createPublicFolder, addCustomParentFramework } from "../lib/helper-replace";
import replace from "../lib/replace";

const generator = path.resolve(__dirname, "./");

export default class CreateStoryblokAppCommand extends Command {
  static description = `CLI for quickly starting a project with Storyblok`;

  static flags = {
    help: Flags.help({ char: "h" }),
    version: Flags.version({ char: "v" }),
    key: Flags.string({ char: "k", description: "Storyblok Access Token" }),
    region: Flags.string({
      char: "r",
      description: "Space region (e.g. us-east-1)",
    }),
    folder: Flags.string({
      char: "d",
      description: "Folder path for the demo (e.g. my-demo)",
    }),
    framework: Flags.string({
      char: "f",
      description: "Framework to use (e.g. remix)",
    }),
    packagemanager: Flags.string({
      char: "p",
      description: "Package manager to use (yarn or npm)",
    })
  };

  async run(): Promise<void> {
    const log = this.log.bind(this);
    const chalkSb = chalk.hex("#00b3b0").bold;

    log("");
    log(
      chalkSb(
        "Welcome 👋, please create a new space first: https://app.storyblok.com/#/me/spaces/new"
      )
    );
    log("");

    const { flags } = await this.parse(CreateStoryblokAppCommand);
    const answers = await inquirer.prompt(prompts, flags);
    const { framework, folder, packagemanager, key, region } =
      answers;
    const frameworkDetails = frameworks.find((f) => f.value === framework);

    if (!framework || !frameworkDetails) {
      throw new Error("Please provide a framework to scaffold with");
    }

    try {
      const token = flags.key || key || frameworkDetails.token;

      // region
      const spaceRegion = flags?.region || region;
      let apiEndpoint = "https://api.storyblok.com/v2/cdn/";
      let regionParam = "";

      if (!token) {
        throw new Error(
          "Please provide your access key with the --key argument"
        );
      }

      let regionCode = "EU";
      if (spaceRegion && spaceRegion.startsWith("us-")) {
        apiEndpoint = "https://api-us.storyblok.com/v2/cdn/";
        regionParam = `?region=${spaceRegion}`;
        regionCode = "US";
      }

      log("");
      log("");
      log(chalkSb("Creating your demo ..."));

      // app endpoint connection
      const story: any = await fetch(
        `${apiEndpoint}stories/home?version=draft&token=${token}`
      ).then((res) => res.json());

      let storyId = 0;
      if (story?.story) {
        storyId = story.story.id;
      } else {
        log(
          chalk.red("ⅹ Could not find the default story with the slug 'home'")
        );
        log(
          chalk.red(
            "ⅹ Or the space is located in a region outside the EU. In that case please provide the '--region' parameter"
          )
        );
        return;
      }

      // framework exmaple cloning
      const gettingStartedRepo =
        "https://github.com/storyblok/getting-started.git";
      await clone(gettingStartedRepo, "temp-started", {
        shallow: true,
        checkout: frameworkDetails.branch ?? "master",
        submodules: frameworkDetails.submodules ?? false,
      });

      copy(`./temp-started/${framework}`, folder);
      fs.rmSync("./temp-started", { recursive: true });
      let replacements = {
        [frameworkDetails.token]: token,
      };
      if (regionCode === "US") {
        let regiontoreplace = "region: ''";
        replacements[regiontoreplace] =
          "region: '" + regionCode.toLowerCase() + "'";
      }

      replace(path.join(folder, frameworkDetails.config), replacements);

      let pathEditing = `https://app.storyblok.com/#/edit/${storyId}${regionParam}`;
      const protocol = frameworkDetails.https ? "https" : "http";
      const localhostPath = `${protocol}://localhost:${frameworkDetails.port}/`;

      log("");
      log(chalkSb("💪 Project created! Now just follow these steps 👇"));
      log("");

      // package manager
      const mangerInstall = packagemanager === "yarn" ? "yarn" : "npm install";
      const mangerRun = packagemanager === "yarn" ? "yarn" : "npm run";
      log(
        chalkSb("1. Start the server: "),
        chalk.yellow(
          `cd ./${folder} && ${mangerInstall} && ${mangerRun} ${frameworkDetails.start}`
        )
      );
      log(chalkSb("2. Start editing:"), chalk.yellow(pathEditing));
      log("");
      log(
        chalkSb(
          "You need to setup mkcert to use the visual editor in the app: "
        )
      );
      log("");
      log(
        chalkSb("2.a MacOS: "),
        chalk.yellow(
          "https://www.storyblok.com/faq/setup-dev-server-https-proxy"
        )
      );
      log(
        chalkSb("2.b Windows: "),
        chalk.yellow(
          "https://www.storyblok.com/faq/setup-dev-server-https-windows"
        )
      );
      log(
        chalkSb("3. Setup your preview url: : "),
        chalk.yellow(
          "https://www.storyblok.com/docs/guide/getting-started#setup-of-the-visual-editor-preview"
        ),
        chalkSb(`to your localhost: ${localhostPath}`)
      );

      if (frameworkDetails.tutorialLink) {
        log("");
        log(
          chalkSb("📕 Read the tutorial:"),
          chalk.yellow(frameworkDetails.tutorialLink)
        );
        log("");
        log("");
      }
    } catch (error) {
      console.error(error);
      fs.rmSync("./temp-started", { recursive: true });
      fs.rmSync(`./${folder}`, { recursive: true });
    }
  }
}
