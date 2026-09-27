import React, { useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import agentPrompt from "../agentPrompt";
import exampleData from "../examples.json";
import styles from "./styles.module.css";

const examples = [
  {
    id: "plural",
    label: "Plurals",
    code: `<fbt desc="Unread messages in the inbox">
  You have
  <fbt:plural count="{{ $count }}" name="count"
              showCount="yes" many="unread messages">
    unread message
  </fbt:plural>.
</fbt>`,
    note: (
      <>
        English and German have two forms. Slovak has three (1, 2–4, 5+), Russian uses the form of 1 also for 21,
        Turkish keeps the noun singular after a number, and Japanese has no plural at all. Translators just fill in
        the forms of their language.
      </>
    ),
  },
  {
    id: "name",
    label: "Names & gender",
    code: `<fbt desc="Notification about a shared photo">
  <fbt:name name="name" gender="{{ $user->gender }}">
    {{ $user->name }}
  </fbt:name>
  shared a photo with you.
</fbt>`,
    note: (
      <>
        In Slovak and Russian, the verb changes with the gender of the person (zdieľal / zdieľala, поделился /
        поделилась). English, German, Turkish and Japanese keep one sentence.
      </>
    ),
  },
  {
    id: "enum",
    label: "Enums",
    code: `<fbt desc="Status of an order">
  Your order has been
  <fbt:enum enum-range="{{ json_encode([
    'shipped' => 'shipped',
    'delivered' => 'delivered',
    'cancelled' => 'cancelled',
  ]) }}" value="{{ $order->status }}" />.
</fbt>`,
    note: (
      <>
        Every value becomes a whole sentence for translators, so they can change the word order and the grammar,
        not just a single word.
      </>
    ),
  },
  {
    id: "pronoun",
    label: "Pronouns",
    code: `<fbt desc="Notification about an updated profile">
  <fbt:param name="name">{{ $user->name }}</fbt:param>
  updated
  <fbt:pronoun type="possessive" human="true"
               gender="{{ $user->pronounGender }}" />
  profile.
</fbt>`,
    note: (
      <>
        English and German pick his / her / their. Slovak and Russian use the same reflexive pronoun for everyone
        (svoj, свой), but the verb changes instead. Turkish and Japanese have no gendered pronouns at all.
      </>
    ),
  },
];

const features = [
  {
    icon: "✍️",
    title: "Inline translations",
    description: (
      <>
        Write texts right where they're used, in Blade with <code>@fbt</code> or in PHP with <code>fbt()</code>. No
        translation keys, no language files to keep in sync.
      </>
    ),
  },
  {
    icon: "🧠",
    title: "Grammar done right",
    description: (
      <>
        Plurals, genders and names are variations translators fill in. Every language gets correct sentences, even
        with three plural forms or gendered verbs.
      </>
    ),
  },
  {
    icon: "🏢",
    title: "Proven at Facebook",
    description: (
      <>
        A port of <a href="https://github.com/facebook/fbt">fbt</a>, the framework Facebook built to translate its
        apps. Same source strings, same translation formats.
      </>
    ),
  },
  {
    icon: "⚡",
    title: "Easy setup",
    description: (
      <>
        One Composer package, artisan commands to collect and translate texts. Store translations in JSON files or
        in the database.
      </>
    ),
  },
  {
    icon: "🎯",
    title: "Translate in context",
    description: (
      <>
        <Link to="/docs/inline_translating">Inline translating</Link> lets translators edit texts right on the
        page, where they see how they're used.
      </>
    ),
  },
  {
    icon: "🧩",
    title: "Built for Laravel",
    description: (
      <>
        Blade directives, the locale of the application, the signed-in user as viewer context, and clean state for
        Octane requests and queued jobs.
      </>
    ),
  },
];

function Hero() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.hero}>
      <div className={clsx("container", styles.heroContainer)}>
        <div className={styles.heroText}>
          <span className={styles.badge}>Internationalization framework for Laravel</span>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroTagline}>
            Translate whole sentences, with plurals, genders and names, so that your Laravel app reads naturally in
            every language.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/getting_started">
              Get started
            </Link>
            <Link className="button button--outline button--secondary button--lg" to="https://github.com/richardDobron/laravel-fbt">
              GitHub
            </Link>
          </div>
          <div className={styles.install}>
            <CodeBlock language="bash">composer require richarddobron/laravel-fbt</CodeBlock>
          </div>
        </div>
        <img className={styles.heroImage} src={useBaseUrl("img/fbt.png")} alt="" />
      </div>
    </header>
  );
}

function InAction() {
  const [locale, setLocale] = useState("sk_SK");

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>FBT in action</h2>
        <p className={styles.sectionLead}>
          Write the text once in English. Translators get whole sentences with the variations their language needs,
          and FBT picks the right one at runtime.
        </p>
        <div className={styles.localeSwitch} role="group" aria-label="Language">
          {Object.entries(exampleData.locales).map(([id, label]) => (
            <button
              key={id}
              type="button"
              lang={id.replace("_", "-")}
              className={clsx(styles.localeButton, locale === id && styles.localeButtonActive)}
              aria-pressed={locale === id}
              onClick={() => setLocale(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <Tabs className={styles.exampleTabs}>
          {examples.map(({ id, label, code, note }) => (
            <TabItem key={id} value={id} label={label}>
              <div className="row">
                <div className="col col--6">
                  <CodeBlock language="html" title="Blade">
                    {code}
                  </CodeBlock>
                </div>
                <div className="col col--6">
                  <div className={styles.outputCard}>
                    <div className={styles.outputHeader}>Output · {exampleData.locales[locale]}</div>
                    <ul className={styles.outputList} lang={locale.replace("_", "-")}>
                      {exampleData.examples[id].map((example) => (
                        <li key={example.label}>
                          <div className={styles.outputMeta}>{example.label}</div>
                          <div className={styles.outputText}>{example.outputs[locale]}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className={styles.exampleNote}>{note}</p>
                </div>
              </div>
            </TabItem>
          ))}
        </Tabs>
        <p className={styles.exampleFootnote}>
          HTML fbts are rendered in <code>@fbtTransform</code> … <code>@endFbtTransform</code>. The outputs above are
          rendered by laravel-fbt.
        </p>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Why FBT?</h2>
        <p className={styles.sectionLead}>
          Getting grammatically correct translations in dynamic applications is hard. Let FBT do the hard work.
        </p>
        <div className={styles.featureGrid}>
          {features.map(({ icon, title, description }) => (
            <div key={title} className={styles.featureCard}>
              <div className={styles.featureIcon} aria-hidden="true">
                {icon}
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GetStarted() {
  return (
    <section className={styles.section}>
      <div className={clsx("container", styles.narrow)}>
        <h2 className={styles.sectionTitle}>Get started in minutes</h2>
        <p className={styles.sectionLead}>Keep translations in JSON files, or in the database.</p>
        <Tabs groupId="driver">
          <TabItem value="json" label="JSON files" default>
            <CodeBlock language="bash">{`composer require richarddobron/laravel-fbt
php artisan vendor:publish --tag=fbt-config

# Wrap texts with @fbt(...), then collect them
php artisan fbt:collect-fbts
php artisan fbt:generate-translations

# Translate storage/fbt/translation_input.json, then
php artisan fbt:translate`}</CodeBlock>
          </TabItem>
          <TabItem value="eloquent" label="Database">
            <CodeBlock language="bash">{`composer require richarddobron/laravel-fbt
php artisan vendor:publish --tag=fbt-config

# Set 'driver' => 'eloquent' in config/fbt.php
php artisan migrate

# Wrap texts with @fbt(...), then collect them
php artisan fbt:collect-fbts

# Add translations to the fbt_translations table, then
php artisan fbt:translate`}</CodeBlock>
          </TabItem>
        </Tabs>
        <p className={styles.center}>
          <Link to="/docs/getting_started">Read the full guide →</Link>
        </p>
      </div>
    </section>
  );
}

function Agents() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className={clsx("container", styles.narrow)}>
        <h2 className={styles.sectionTitle}>Let your coding agent set it up</h2>
        <p className={styles.sectionLead}>
          Paste this prompt into Claude Code, Cursor or Copilot, it installs laravel-fbt and wraps the texts of your
          app.
        </p>
        <CodeBlock language="text" title="Prompt">
          {agentPrompt}
        </CodeBlock>
      </div>
    </section>
  );
}

function BasedOn() {
  return (
    <section className={clsx(styles.section, styles.center)}>
      <h2 className={styles.sectionTitle}>Based on Facebook's fbt</h2>
      <a href="https://github.com/facebook/fbt">
        <img className={styles.basedOnLogo} src={useBaseUrl("img/flogo_RGB_HEX-72.svg")} alt="Facebook" />
      </a>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main>
        <InAction />
        <Features />
        <GetStarted />
        <Agents />
        <BasedOn />
      </main>
    </Layout>
  );
}
