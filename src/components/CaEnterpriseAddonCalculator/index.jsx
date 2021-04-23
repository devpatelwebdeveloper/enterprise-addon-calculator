import React, { createContext, useReducer, useContext, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CaEnterpriseAddonCalculator.css";

// Constants
const featuresData = [
  {
    name: "inventory",
    title: "Advanced inventory",
    features: [
      "Prioritize sales orders and improved picking process",
      "Save time and effort by making reviewing more automated",
      "Easily track product movement and storage"
    ],
    ctas: [
      {
        text: "Learn more",
        url: "https://quickbooks.intuit.com/ca/enterprise/advanced-inventory/"
      }
    ]
  },
  {
    name: "pricing",
    title: "Advanced pricing",
    features: [
      "Set sophisticated price rules",
      "Create scheduled promotions with future start dates",
      "Automate your Pricing"
    ],
    ctas: [
      {
        text: "Learn more",
        url: "https://quickbooks.intuit.com/ca/enterprise/advanced-pricing/"
      }
    ]
  },
  {
    name: "hosting",
    title: "Hosting",
    features: [
      "Run Enterprise from anytime, anywhere, on any device",
      "Easily collaborate with your teams by accessing the same information at the same time",
      "Data is securely backed up daily"
    ],
    ctas: [
      {
        text: "Learn more",
        url: "https://quickbooks.intuit.com/ca/enterprise/cloud-hosting/"
      }
    ]
  }
];

const costData = [
  {
    users: 5,
    cost: 380,
    features: {
      inventory: {
        state: false,
        cost: 106
      },
      pricing: {
        state: false,
        cost: 43
      },
      hosting: {
        state: false,
        cost: 253
      }
    }
  },
  {
    users: 10,
    cost: 569,
    features: {
      inventory: {
        state: true,
        cost: 0
      },
      pricing: {
        state: true,
        cost: 0
      },
      hosting: {
        state: false,
        cost: 506
      }
    }
  },
  {
    users: 15,
    cost: 759,
    features: {
      inventory: {
        state: true,
        cost: 0
      },
      pricing: {
        state: true,
        cost: 0
      },
      hosting: {
        state: false,
        cost: 759
      }
    }
  },
  {
    users: 20,
    cost: 918,
    features: {
      inventory: {
        state: true,
        cost: 0
      },
      pricing: {
        state: true,
        cost: 0
      },
      hosting: {
        state: false,
        cost: 1012
      }
    }
  },
  {
    users: 25,
    cost: 1107,
    features: {
      inventory: {
        state: true,
        cost: 0
      },
      pricing: {
        state: true,
        cost: 0
      },
      hosting: {
        state: false,
        cost: 1265
      }
    }
  },
  {
    users: 30,
    cost: 1265,
    features: {
      inventory: {
        state: true,
        cost: 0
      },
      pricing: {
        state: true,
        cost: 0
      },
      hosting: {
        state: false,
        cost: 1518
      }
    }
  }
];

const initState = {
  features: {
    pricing: false,
    inventory: false,
    hosting: false
  },
  total: 0,
  users: 5,
  costing: costData[0]
};

const store = createContext();

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;

    switch (type) {
      case "setInventory":
        return {
          ...state,
          features: { ...state.features, inventory: payload }
        };
      case "setPricing":
        return { ...state, features: { ...state.features, pricing: payload } };
      case "setHosting":
        return { ...state, features: { ...state.features, hosting: payload } };
      case "setTotal":
        return { ...state, total: payload };
      case "setUsers":
        return { ...state, users: payload };
      case "setCosting":
        return { ...state, costing: payload };
    }
  }, initState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const EnterprisePackageItem = ({ cost, name, title, features, ctas }) => {
  const cx = classNames.bind(styles);
  const { state, dispatch } = useContext(store);
  const setType = `set${name.charAt(0).toUpperCase() + name.slice(1)}`;

  const handleChange = (event) => {
    dispatch({ type: setType, payload: event.currentTarget.checked });
  };

  return (
    <div className={cx("chart-item")}>
      <div className={cx("chart-item-top")}>
        <div className={cx("chart-item-title")}>{title}</div>

        <div className={cx("chart-toggle")}>
          <input
            data-testid={`${name}-toggle`}
            className={cx("chart-toggle-input")}
            checked={state.features[name]}
            onChange={(event) => handleChange(event)}
            id={`${name}-toggle`}
            name={name}
            type="checkbox"
            value={name}
            disabled={state.costing.features[name].state === true}
          />
          <label
            className={cx("chart-toggle-label")}
            htmlFor={`${name}-toggle`}
          ></label>
        </div>
      </div>

      <div className={cx("chart-price-add")}>Add</div>
      <div className={cx("chart-price")}>
        <div className={cx("chart-price-dollars")}>${cost}</div>
        <div className={cx("chart-price-cents")}>00</div>
        <div className={cx("chart-price-term")}>/mo.</div>
      </div>

      <ul className={cx("chart-features", "checkmark__list")}>
        {features.map((feature, index) => (
          <li key={index} className={cx("chart-features-item")}>
            <span className="checkmark"></span> {feature}
          </li>
        ))}
      </ul>
      {ctas &&
        ctas.map((cta, index) => (
          <button key={index} url={cta.url} className={cx("chart-button")}>
            {cta.text}
          </button>
        ))}
    </div>
  );
};

const EnterprisePackageTotal = ({ base }) => {
  const cx = classNames.bind(styles);
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const features = featuresData;

  const featuresState = state.features;
  const featuresCost = state.costing.features;

  const getFeatureTitle = (name) => {
    const filtered = features.filter((feature) => feature.name === name);

    return filtered[0].title;
  };

  const getFeatureList = () => {
    let features = [];
    for (const feature in featuresState) {
      if (featuresState[feature] === true) {
        let featureObj = {};
        featureObj.text = getFeatureTitle(feature);
        featureObj.cost = featuresCost[feature].cost;

        features.push(featureObj);
      }
    }
    return features;
  };

  const featureList = getFeatureList();

  const reducer = (accumulator, currentValue) =>
    accumulator + currentValue.cost;

  const total = featureList.reduce(reducer, state.costing.cost);

  return (
    <div className={cx("total")}>
      <div className={cx("total-top")}>
        <div className={cx("total-title")}>Total</div>
        <div className={cx("total-price")}>
          <div data-testid="total" className={cx("total-price-dollars")}>
            ${total}
          </div>
          <div className={cx("total-price-cents")}>00</div>
          <div className={cx("total-price-term")}>/mo.</div>
        </div>
        <div className={cx("total-price-info")}>
          Annual subscription billed monthly
        </div>
      </div>
      <div className={cx("includes")}>
        <div className={cx("includes-title")}>Your subscription includes:</div>
        <div className={cx("includes-item")}>
          <div className={cx("includes-text")}>
            Desktop Enterprise Subscription
          </div>
          <div className={cx("includes-cost")}>${base}</div>
        </div>
        {(featureList === undefined || featureList.length !== 0) &&
          featureList.map((feature, index) => (
            <div key={index} className={cx("includes-item")}>
              <div className={cx("includes-text")}>{feature.text}</div>
              <div className={cx("includes-cost")}>${feature.cost}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

const EnterprisePackageBuilder = () => {
  const cx = classNames.bind(styles);
  const selectedUsers = (users) => {
    return costData.filter((item) => item.users === users)[0];
  };

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const handleChange = (event) => {
    const num = parseInt(event.currentTarget.value);
    const userCost = selectedUsers(num);

    for (const feature in userCost.features) {
      const setType = `set${
        feature.charAt(0).toUpperCase() + feature.slice(1)
      }`;
      const featState = userCost.features[feature].state;

      if (feature === "hosting" && state.features.hosting === true) {
        featState = true;
      }

      dispatch({ type: setType, payload: featState });
    }

    dispatch({ type: "setUsers", payload: num });

    dispatch({ type: "setCosting", payload: userCost });
  };

  const features = featuresData;

  return (
    <div
      data-testid="CaEnterpriseAddonCalculator"
      data-tracking="ca_enterprise_addon_calculator"
      className={cx("CaEnterpriseAddonCalculator")}
    >
      {/* USERS */}
      <div className={cx("users")}>
        {costData.map((item) => (
          <div className={cx("radio")} key={item.users}>
            <input
              data-testid={`users-${item.users}`}
              className={cx("radio-input")}
              id={`users-${item.users}`}
              name="users"
              type="radio"
              value={item.users}
              checked={state.users === item.users}
              onChange={handleChange}
            ></input>
            <div className={cx("radio-circle")}></div>
            <label
              className={cx("radio-label")}
              htmlFor={`users-${item.users}`}
            >
              {item.users}
            </label>
          </div>
        ))}
      </div>

      {/* END USERS */}

      <div className={cx("chart")}>
        <div className={cx("chart-products")}>
          {features.map((feature) => {
            return (
              <EnterprisePackageItem
                key={feature.name}
                name={feature.name}
                title={feature.title}
                cost={state.costing.features[feature.name].cost}
                features={feature.features}
                ctas={feature.ctas}
              />
            );
          })}
        </div>

        <EnterprisePackageTotal base={state.costing.cost} />
      </div>
    </div>
  );
};

const CaEnterpriseAddonCalculator = () => (
  <StateProvider>
    <EnterprisePackageBuilder />
  </StateProvider>
);

CaEnterpriseAddonCalculator.propTypes = {};

export default CaEnterpriseAddonCalculator;
