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

This extension ports the excellent
**[phpactor Language Server](https://github.com/phpactor/phpactor)**
for use with Nova! with **An Important Language**.

I find **phpactor** far superior to Intelephense because of the
limitless refactoring possibilities it offers for **PHP** 🐘 projects.
Nova 🌌 is a **perfect** fit for this language server, making it easy
to utilise all its features via the _code action_.

> ⚠️ Tutorials, examples, and detailed usage instructions will be
> added once the pesky bugs 🐞 are fixed.

<!--
🎈 It can also be helpful to include a screenshot or GIF showing your extension in action:
-->

## Requirements

<!--
🎈 If your extension depends on external processes or tools that users will need to have, it's helpful to list those and provide links to their installers:
-->

phpactor requires some additional tools to be installed on your Mac:

The extension automatically downloads a copy of the latest phpactor
executable (no manual download required).

- Composer
- Git
- PHP 8.1+
  - you also need to require **PHP 8.1+** as a _platform package_ in
    your `composer.json` see below 👇

## Project Recommendation

- As noted by
  [phpactor](https://phpactor.readthedocs.io/en/master/usage/standalone.html#health-check)
  > phpactor will perform better with Composer and, to a lesser
  > extent, with git.
- If you're working with a commonly used **PHP frameworks** like
  _Laravel_, _Symfony_ ,no additional setup is needed 😊.
- For **raw PHP** projects, you’ll need a properly configured Composer
  project. To get the bare minimum support for the **PHP standard
  library** do the following:

  ```shell
  git init \
  composer init \
  composer require php ^8.1 \
  ```

  - Having a proper **PSR** standard configured in your
    `composer.json`, greatly enhances the refactoring options
    available.
  - The more detailed your `composer.json` the more value you’ll get
    out of **phpactor!** 😝

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

- the default configuration locations are used. Refer to the
  [the docs](https://phpactor.readthedocs.io/en/master/usage/configuration.html)
  - I will add a `dump` command in the future to export the current
    configuration in your project's root

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

- [ ] Adding the possibility not to download `phpactor`, if the exec
      already exist in you `PATH` or give you an option to use your
      own. It only downloads once when the extension is loaded!
- [ ] Add commands to support few of the missed out refactoring
      actions
- [ ] Configuration via Nova GUI
- [x] Better error handling
- [x] Providing useful extension notification like downloading,
      completing or any corresponding error

## Credits:

- **phpactor Language Server** by Daniel and Contributors
  [Github](https://github.com/phpactor/phpactor)
- I used the `build.ts` (modified for this project) from the
  [Nova Deno Language Server project by Sam](https://github.com/sgwilym/nova-deno)
  for bundling my source code
- The `nova.d.ts` is assembeled by
  [Tommaso - Nova Types](https://github.com/tommasongr/nova-types). I
  made some adjustments and plan to submit a pull request for
  additional APIs!
