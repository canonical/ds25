import { SHOWCASE_EXAMPLES } from "../../data/index.js";
import { Controls, TypographicSpecimen } from "../Example/common/index.js";

const Showcase = () => {
  return (
    // <Example items={SHOWCASE_EXAMPLES}>
    //   <div>
    //     <Example.Renderer />
    //     <Example.Controls />
    //   </div>
    // </Example>
    <>
      <TypographicSpecimen />
      <Controls />
    </>
  );
};

export default Showcase;
