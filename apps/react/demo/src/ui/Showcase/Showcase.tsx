import { Example } from "./common/index.js";
import "./styles.css";

const Showcase = () => {
  return (
    <Example>
      <div className="example">
        <Example.Renderer className="renderer" />
        <Example.Controls className="controls" />
      </div>
    </Example>
  );
};

export default Showcase;
