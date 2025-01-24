<!--
👋 Hello! As Nova users browse the extensions library, a good README can help them understand what your extension does, how it works, and what setup or configuration it may require.

Not every extension will need every item described below. Use your best judgement when deciding which parts to keep to provide the best experience for your new users.

💡 Quick Tip! As you edit this README template, you can preview your changes by selecting **Extensions → Activate Project as Extension**, opening the Extension Library, and selecting "phpactor" in the sidebar.

Let's get started!
-->

<!--
🎈 Include a brief description of the features your extension provides. For example:
-->

## ⚠️ Do NOT use/replace Intelephense just yet! but feel free to play around with it 😜

An Extension porting the superb
**[phpactor Language Server](https://github.com/phpactor/phpactor)**! with **An
Important Language**. I personally find **phpactor** way more superior, compared
to Intelephense, simply because of the limitless, refactoring possibilities it
offers to a **PHP** 🐘 project! Nova 🌌 happens to be a **perfect** fit for this
Language Server, to utilise all it's goodies via the _code action_

> ⚠️ How to, tutorials, and examples will be added in due course once the pesky
> bugs are fixed 🐞

<!--
🎈 It can also be helpful to include a screenshot or GIF showing your extension in action:
-->

## Requirements

<!--
🎈 If your extension depends on external processes or tools that users will need to have, it's helpful to list those and provide links to their installers:
-->

phpactor requires some additional tools to be installed on your Mac:

- The extension automatically downloads a copy of `phpactor` exec and use it (no
  need to download)
- Composer
- Git
- PHP 8.1+
  - you also need to require **PHP 8.1+** as a _platform package_ in your
    `composer.json` see below 👇

## Project Recommendation

- As noted by [phpactor]()
  > phpactor will perform better with Composer and, to a lesser extent, with
  > git.
- If you are working using one of the commonly used **PHP frameworks** like
  _laravel_, _symphony_ you do not need to do anything 😊
- For hardcore **raw PHP** as such you need a properly composer project set up.
  to get the bare minimum, **PHP standard library** support, you should do:
  - Having a proper **PSR** standard configured in your `composer.json`, would
    greatly provides more refactoring options!
  - The more detail you provide in `composer.json` the more you get out of the
    **phpactor!** 😝

```shell
git init \
composer init \
composer require php ^8.1 \
```

<!--
✨ Providing tips, tricks, or other guides for installing or configuring external dependencies can go a long way toward helping your users have a good setup experience:
-->

## Usage

<!--
🎈 If your extension provides features that are invoked manually, consider describing those options for users:
-->

**_🔜 Coming Soon_**

<!--
🎈 Alternatively, if your extension runs automatically (as in the case of a validator), consider showing users what they can expect to see:
-->

### Configuration

<!--
🎈 If your extension offers global- or workspace-scoped preferences, consider pointing users toward those settings. For example:
-->

- For now the default locations are used see
  [the docs](https://phpactor.readthedocs.io/en/master/usage/configuration.html)

```
**/workspace/.phpactor.yml

~/.config/phpactor/phpactor.yml

/etc/xdg/phpactor/phpactor.yml
```

<!--
👋 That's it! Happy developing!

P.S. If you'd like, you can remove these comments before submitting your extension 😉
-->

#### To Do

- [ ] Adding the possibility not to download `phpactor`, if the exec already
      exist in you `PATH` or give you an option to use your own. It only
      downloads once when the extension is loaded!
- [ ] Add commands to support few of the missed out refactoring actions
- [ ] Configuration via Nova GUI
- [ ] Better error handling
- [ ] Providing useful extension notification like downloading, completing or
      any corresponding error

## Credits:

- **phpactor Language Server** by Daniel and Contributors
  [Github](https://github.com/phpactor/phpactor)
- I used the `build.ts` (modified for this project) from the
  [Nova Deno Language Server project by Sam](https://github.com/sgwilym/nova-deno)
  for bundling my source code
- The `nova.d.ts` is assembeled by
  [Tommaso - Nova Types](https://github.com/tommasongr/nova-types). Although I
  had to adjust a bit and will do a pull request soon for some of the APIs!
