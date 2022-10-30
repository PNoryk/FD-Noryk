import { DoubleButton } from "./DoubleButton";
import { withRainbowFrame } from "./withRainbowFrame";

function App() {
  // prettier-ignore
  let colors = [ 'red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple' ];
  let FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

  return (
    <>
      <DoubleButton
        caption1="однажды"
        caption2="пору"
        cbPressed={(num) => alert(num)}
      >
        в студёную зимнюю
      </DoubleButton>

      <FramedDoubleButton
        caption1="я из лесу"
        caption2="мороз"
        cbPressed={(num) => alert(num)}
      >
        вышел, был сильный
      </FramedDoubleButton>
    </>
  );
}

export default App;
