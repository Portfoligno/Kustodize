[![Build Status](https://circleci.com/gh/Portfoligno/Kustodize/tree/master.svg?style=shield)](
  https://circleci.com/gh/Portfoligno/Kustodize
)
[![npm version](https://badge.fury.io/js/kustodize.svg)](
  https://badge.fury.io/js/kustodize
)

Kustodize
===

This project aims at providing a convention over configuration style wrapper of
[`kustomize`](https://github.com/kubernetes-sigs/kustomize).

The way that `kustomize` focuses on representing infrastructural differences and changes as patches
has proven to provide conformity in the language (YAML) between combined states and each composition.

And `kustodize` is implemented in a manner that put such harmony of `kustomize` in "kustody", while in return,
empower us with the realization of treating configuration files as functions of records to desired states directly.


## Planned Features

- [x] Unrestricted basic templating: `{{ VARIABLE }}`
- [ ] Type detection and character escaping in YAML templates
- [ ] Auto-inclusion of resource files
- [ ] Auto-inclusion of secret and configmap files as `kustomize` generators
- [x] Automatic decryption of secrets with `ansible-vault`

## Usage
File structure:
```
~/someApp
├── base
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── build
├── overlays
│   ├── development
│   │   ├── cpu_count.yaml
│   │   ├── kustomization.yaml
│   │   └── replica_count.yaml
│   └── production
│       ├── secret
│       │   └── credentials
│       │       └── private_key
│       ├── cpu_count.yaml
│       ├── kustomization.yaml
│       └── replica_count.yaml
└── kustodization.yaml
```

In addition to `kustomize`, `kustodization.yaml` marks the project root and hence the `build` directory for outputs. 

To generate YAML (`kubectl` need to be available on your path):
```sh
kustodize build ~/someApp/overlays/production
```

Or you may [apply](https://kubernetes-sigs.github.io/kustomize/api-reference/glossary#apply)
it directly to a cluster as well:
```sh
kustodize generate ~/someApp/overlays/production | xargs kubectl apply -k
```

## Installation

```sh
npm install -g kustodize
```

### Prerequisites
* Node.js
* `kubectl` (optional, required for the `build` command)
* `ansible-base` (optional, required for decryption of secrets)
