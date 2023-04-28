import React, { useId, useState } from "react";
import { Field, Form } from "react-final-form";
import classNames from "classnames/bind";
import styles from "./App.module.scss";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const cn = classNames.bind(styles);

function App() {
  const [ndflCheckbox, setNdflCheckbox] = useState<boolean>(true);
  const [isClickedTooltip, setIsClickedTooltip] = useState<boolean>(false);
  const [isHoveredTooltip, setIsHoveredTooltip] = useState<boolean>(false);
  const tooltipId = useId();

  const onSubmit = () => {};
  const validate = (e: any) => { return e; };

  const salaryTypes = [
    { name: "monthlySalary" },
    { name: "mrot" },
    { name: "dailySalary" },
    { name: "hourSalary" },
  ];

  const formatNumber = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className={cn("d-flex", "form")}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{ salary: salaryTypes[0].name, sum: 40000 }}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <div className={cn("form__container")}>
              <label className={cn("text-secondary", "form__label")}>
                Сумма
              </label>
              <div className={cn("flex-column d-flex", "form__button")}>
                <div className={cn("form__button-container")}>
                  <Field
                    name="salary"
                    component="input"
                    type="radio"
                    format={(salary) => salary}
                    value={salaryTypes[0].name}
                  />
                  <span className={cn("form__item-text")}>Оклад за месяц</span>
                </div>
                <div className={cn("form__button-container")}>
                  <Field
                    name="salary"
                    component="input"
                    type="radio"
                    format={(salary) => salary}
                    value={salaryTypes[1].name}
                  />
                  <span className={cn("form__item-text")}>МРОТ</span>
                  <span
                    onMouseEnter={() => setIsHoveredTooltip(true)}
                    onMouseLeave={() => setIsHoveredTooltip(false)}
                    onClick={() =>
                      setIsClickedTooltip((prevState) => !prevState)
                    }
                    data-tooltip-id={tooltipId}
                    className={cn("form__tooltip-icon", {
                      "form__tooltip-icon_clicked": isClickedTooltip,
                    })}
                  />
                  <Tooltip
                    isOpen={isClickedTooltip || isHoveredTooltip}
                    place="bottom"
                    id={tooltipId}
                    content="МРОТ - минимальный размер оплаты труда. Разный для разных регионов."
                    className={cn("form__tooltip")}
                  />
                </div>
                <div className={cn("form__button-container")}>
                  <Field
                    name="salary"
                    component="input"
                    type="radio"
                    format={(salary) => salary}
                    value={salaryTypes[2].name}
                  />
                  <span className={cn("form__item-text")}>Оплата за день</span>
                </div>
                <div className={cn("form__button-container")}>
                  <Field
                    name="salary"
                    component="input"
                    type="radio"
                    format={(salary) => salary}
                    value={salaryTypes[3].name}
                  />
                  <span className={cn("form__item-text")}>Оплата за час</span>
                </div>
              </div>

              {values?.salary !== "mrot" && (
                <>
                  <div className={cn("form__switch-container", "d-flex")}>
                    <span
                      className={cn("form__label", {
                        "text-secondary": ndflCheckbox,
                      })}
                    >
                      Указать с НДФЛ
                    </span>
                    <label className={cn("switch")}>
                      <input
                        type="checkbox"
                        checked={ndflCheckbox}
                        onChange={(e) => setNdflCheckbox(e.target.checked)}
                      />
                      <span className={cn("slider", "round")} />
                    </label>
                    <span
                      className={cn("form__label", {
                        "text-secondary": !ndflCheckbox,
                      })}
                    >
                      Без НДФЛ
                    </span>
                  </div>

                  <div className={cn("form__input")}>
                    <Field
                      name="sum"
                      component="input"
                      type="text"
                      placeholder="Сумма"
                      format={(sum) => values.sum}
                      value={values.sum}
                      maxLength="11"
                    />
                    {" ₽ "}
                    {values?.salary === "dailySalary" && <span>в день</span>}
                    {values?.salary === "hourSalary" && <span>в час</span>}
                  </div>
                </>
              )}
            </div>
            {values?.salary === "monthlySalary" && values.sum && (
              <div className={cn("form__field", "field")}>
                <div>
                  <span className={cn("field__salary")}>
                    {formatNumber(
                      ndflCheckbox ? values.sum : Math.round(values.sum * 0.87)
                    )}{" "}
                    ₽{" "}
                  </span>
                  сотрудник будет получать на руки
                </div>
                <div>
                  <span className={cn("field__salary")}>
                    {formatNumber(
                      ndflCheckbox
                        ? Math.round(values.sum / 0.87) - values.sum
                        : values.sum - Math.round(values.sum * 0.87)
                    )}{" "}
                    ₽{" "}
                  </span>{" "}
                  НДФЛ, 13% от оклада
                </div>
                <div>
                  <span className={cn("field__salary")}>
                    {formatNumber(
                      ndflCheckbox ? Math.round(values.sum / 0.87) : values.sum
                    )}{" "}
                    ₽{" "}
                  </span>{" "}
                  за сотрудника в месяц
                </div>
              </div>
            )}
          </form>
        )}
      />
    </div>
  );
}

export default App;
