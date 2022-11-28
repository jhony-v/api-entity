import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    description: (
      <>
        Api entity was designed from the ground up to be easily installed and used to make request
        and running quickly.
      </>
    ),
  },
  {
    title: "Typescript support",
    description: (
      <>
        No matter if whether you are using typescript or not, it automatically resolves promises
        with type definitions. However, you can add it easily through interfaces.
      </>
    ),
  },
  {
    title: "Support multiple adapters",
    description: (
      <>
        You don't need to use axios or other library to use this library, but it is open to work
        under custom adapters and extend it with fast configurations.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
