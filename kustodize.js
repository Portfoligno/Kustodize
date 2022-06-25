#!/usr/bin/env node
const { program } = require('@caporal/core')
const { resolve } = require('path')
const kustodize = require('./dist')

process.on('uncaughtException', e => {
  console.error(`error: Uncaught exception encountered after '${kustodize.lastUnsafeAction}'`)
  console.error(`error: ${e}`)
  process.exit(1)
})

program
  .logger({ error: message => console.error(`error: ${message}`) })
  .command('build', 'Print configuration per contents of kustomization.yaml')
  .option('-C, --kubectl', 'Prefer "kubectl kustomize" over "kustomize build"')
  .argument('[path]', 'Directory that contains kustomization.yaml', { default: '.' })
  .action(({ args, options }) => {
    switch (options.kubectl) {
      case false:
      case true:
        return kustodize.build(args.path.toString(), options.kubectl)
      default:
        // It looks like the path is parsed into `options` instead...
        return kustodize.build(options.kubectl.toString(), true)
    }
  })
  .command('generate', "Output processed directory contents to '/build'")
  .argument('[path]', 'Directory that contains kustomization.yaml', { default: '.' })
  .action(async ({ args }) =>
    console.log(await kustodize.generate(args.path.toString()))
  )
  .command('version', 'Prints the kustodize version')
  .action(() =>
    console.log(require(resolve(__filename, '..', 'package.json')).version)
  )

program.disableGlobalOption('-V')
program.disableGlobalOption('--no-color')
program.disableGlobalOption('-v')
program.disableGlobalOption('--quiet')
program.disableGlobalOption('--silent')
program.run()
