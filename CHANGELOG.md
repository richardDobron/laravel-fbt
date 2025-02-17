# Changelog

All notable changes to `laravel-fbt` will be documented in this file.

Updates should follow the [Keep a CHANGELOG](http://keepachangelog.com/) principles.

## v4.3.2 - 2025-02-16
### Changed
- Update `fbt` dependency to 4.3.2.
### Added
- FbtConfig listener for locale change

## v4.3.1 - 2025-01-12
### Changed
- Update `fbt` dependency to 4.3.1.

## v4.3.0 - 2024-12-14
### Changed
- Update `fbt` dependency to 4.3.0.

## v4.2.8 - 2024-11-01
### Changed
- Update `fbt` dependency to 4.2.9.

## v4.2.7 - 2024-11-01
### Changed
- Update `fbt` dependency to 4.2.8.

## v4.2.6 - 2024-06-16
### Added
- Support for Laravel 11

### Changed
- Update `fbt` dependency to 4.2.7.

## v4.2.5 - 2024-06-01
### Changed
- Update `fbt` dependency to 4.2.6.

## v4.2.4 - 2024-04-16
### Changed
- Update `fbt` dependency to 4.2.5.

## v4.2.3 - 2024-01-12
### Changed
- Update `fbt` dependency to 4.2.4.

## v4.2.2 - 2023-12-09
### Changed
- Update `fbt` dependency to 4.2.3.
- Load migrations only if config `fbt.driver` is `eloquent`

## v4.2.1 - 2023-06-28
### Changed
- Update `fbt` dependency to 4.2.2.
- Option --translations-input has been renamed to --translation-input for command `fbt:generate-translations`

## v4.2.0 - 2023-06-24
### Added
- Config `prettyPrint` (default `true`) to pretty print source strings in a JSON file.

### Changed
- Update `fbt` dependency to 4.2.1.

### Removed
- Option `--views` for command `fbt:collect-fbts` is removed. Now all blade files are collected by default.
- Option `--pretty` for command `fbt:phrases` is removed. Pretty printing is now controlled by the `prettyPrint` config option.

### Fixed
- Fbt collection from blade files (now collects all fbt functions, not just `@fbt` directives)
- function `fbs()` is now working properly

## v4.1.1 - 2023-06-15
### Added
- Support for Laravel 10

## v4.1.0 - 2023-04-19
### Changed
- Update `fbt` dependency to 4.1.0.
- Changed default driver to `json`

### Added
- Added a new `--clean-cache=` parameter (default: true) for the `fbt:collect-fbts` command. This parameter allows for automatic deletion of the `.source_strings.json` file.
## v4.0.12 - 2023-02-28

### Fixed
- Added missing `--fbt-common-path` parameter for `fbt:collect-fbts` command

## v4.0.11 - 2023-02-03

### Changed
- Update `fbt` dependency to 4.0.11.

## v4.0.10 - 2023-01-10

### Fixed
- `@fbs` directive

### Changed
- Update `fbt` dependency to 4.0.10.

## v4.0.9 - 2022-12-16

### Changed
- Update `fbt` dependency to 4.0.9.

## v4.0.8 - 2022-09-14

### Added
- Command to collect FBT strings in \*.blade.php
- Support for Laravel 9

### Changed
- Update `fbt` dependency to 4.0.8.

## v4.0.7 - 2022-09-09

### Added
- Command to collect FBT strings

### Changed
- Update `fbt` dependency to 4.0.7.

## v4.0.6 - 2022-08-09

### Changed
- Update `fbt` dependency to 4.0.6.

## v4.0.5 - 2022-07-30

### Changed
- Update `fbt` dependency to 4.0.5.

### Added
- Write permissions check

## v4.0.4 - 2022-07-10

### Changed
- Update `fbt` dependency to 4.0.4.

### Added
- Command to generate missing translation hashes

## v4.0.3 - 2022-06-25

### Changed
- Update `fbt` dependency to 4.0.3.

## v4.0.2 - 2022-06-23

### Changed
- Update `fbt` dependency to 4.0.2.

## v4.0.1 - 2022-06-19

### Changed
- Translation registration will handle the fbt dependency.

## v4.0 - 2022-04-09

### Added
- Support for Laravel 5.6 or higher.

## v3.0 - 2022-02-21

### Added
- PHP Internationalization Framework for Laravel 5.5.
