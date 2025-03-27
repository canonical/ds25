import { FormProvider, useForm } from "react-hook-form";
import { SHOWCASE_EXAMPLES } from "../../data/index.js";
import { Example } from "../Example/index.js";

const Showcase = () => {
  const methods = useForm({
    mode: "onChange",
    defaultValues: Object.fromEntries(
      // Todo use query parameters to figure out which example to show
      SHOWCASE_EXAMPLES[0].controls.map((control) => [
        control.name,
        control.defaultValue,
      ]),
    ),
  });

  return (
    <FormProvider {...methods}>
      <Example items={SHOWCASE_EXAMPLES}>
        <div>
          <Example.Renderer />
          <Example.Controls />
        </div>
      </Example>
    </FormProvider>
  );
};

export default Showcase;
