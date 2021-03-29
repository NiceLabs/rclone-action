# Setup Rclone

Unofficial Rclone action

## Usage

### Pre-requisites

Create a workflow `.yml` file in your repositories `.github/workflows` directory.
An [example workflow](#example-workflow) is available below.
For more information, reference the GitHub Help Documentation for [Creating a workflow file][creating-a-workflow-file].

### Inputs

| Field                | Description                          |
| -------------------- | ------------------------------------ |
| `github-token`       | Provide an allow update secret token |
| `config`             | Read config from secret              |
| `config-secret-name` | Save config to secret                |

### Example workflow

```yaml
name: Release

on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
      - uses: NiceLabs/rclone-action@master
        with:
          github-token: ${{ secrets.SECRET_TOKEN }}
          config: ${{ secrets.RCLONE_CONFIG }}
          config-secret-name: RCLONE_CONFIG
      - name: Upload Pre-built images
        run: rclone copy source:sourcepath dest:destpath
        env:
          RCLONE_CONFIG_PASS: ${{ secrets.RCLONE_CONFIG_PASS }}
```

## License

[MIT LICENSE](LICENSE)

[creating-a-workflow-file]: https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file
