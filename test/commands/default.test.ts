import {expect, test} from '@oclif/test'

describe('Launch command', () => {
  test
  .stdout({print: false})
  .command(['default', '--help'])
  .exit(0)
  .it('with Help', async ctx => {
    expect(ctx.stdout).to.contain('Storyblok')
  })

  test
  .stdout({print: false})
  .command(['default', '--folder=mytestdir', '--packagemanager=npm', '--framework=astro', '--region=YOLO', '--key=TEST'])
  .it('with wrong region', async ctx => {
    expect(ctx.stdout).to.contain('Please provide a valid region')
  })
})
