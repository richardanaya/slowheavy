import { useEffect, useState } from "react";
import {
  App,
  Navbar,
  Page,
  BlockTitle,
  Block,
  Button,
  Stepper,
  Chip,
} from "framework7-react";

export default () => {
  // lets make an exercise tracker that tracks the number of seconds we do an exercise at a certain weight

  const [pullDownWeight, setPullDownWeight] = useState(0);
  const [chestPressWeight, setChestPressWeight] = useState(0);
  const [legPressWeight, setLegPressWeight] = useState(0);

  const [pullDownTime, setPullDownTime] = useState(0);
  const [chestPressTime, setChestPressTime] = useState(0);
  const [legPressTime, setLegPressTime] = useState(0);

  const [isPullDownRunning, setIsPullDownRunning] = useState(false);
  const [isChestPressRunning, setIsChestPressRunning] = useState(false);
  const [isLegPressRunning, setIsLegPressRunning] = useState(false);

  const formatSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  useEffect(() => {
    if (isPullDownRunning) {
      const interval = setInterval(() => {
        setPullDownTime(pullDownTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPullDownRunning, pullDownTime]);

  useEffect(() => {
    if (isChestPressRunning) {
      const interval = setInterval(() => {
        setChestPressTime(chestPressTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isChestPressRunning, chestPressTime]);

  useEffect(() => {
    if (isLegPressRunning) {
      const interval = setInterval(() => {
        setLegPressTime(legPressTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLegPressRunning, legPressTime]);

  const statTotalTime = pullDownTime + chestPressTime + legPressTime;
  const statTotalWeightOverTime =
    pullDownWeight * pullDownTime +
    chestPressWeight * chestPressTime +
    legPressWeight * legPressTime;

  return (
    <App>
      <Page>
        <Navbar title="Slow Heavy" />
        <BlockTitle>Pull Down</BlockTitle>
        <Block strong outlineIos>
          <div className="grid grid-cols-3 grid-gap">
            <Button
              raised
              fill
              round
              onClick={() => {
                if (pullDownTime > 0 && !isPullDownRunning) {
                  setPullDownTime(0);
                } else {
                  setIsPullDownRunning(!isPullDownRunning);
                }
              }}
            >
              {pullDownTime > 0 && !isPullDownRunning
                ? "Reset"
                : isPullDownRunning
                ? "Stop"
                : "Start"}
            </Button>
            <Stepper
              onStepperPlusClick={() => {
                setPullDownWeight(pullDownWeight + 5);
              }}
              onStepperMinusClick={() => {
                setPullDownWeight(pullDownWeight - 5);
              }}
              value={pullDownWeight}
            />
            <Chip outline text={formatSeconds(pullDownTime)} />
          </div>
        </Block>
        <BlockTitle>Chest Press</BlockTitle>
        <Block strong outlineIos>
          <div className="grid grid-cols-3 grid-gap">
            <Button
              raised
              fill
              round
              onClick={() => {
                if (chestPressTime > 0 && !isChestPressRunning) {
                  setChestPressTime(0);
                } else {
                  setIsChestPressRunning(!isChestPressRunning);
                }
              }}
            >
              {chestPressTime > 0 && !isChestPressRunning
                ? "Reset"
                : isChestPressRunning
                ? "Stop"
                : "Start"}
            </Button>
            <Stepper
              onStepperPlusClick={() => {
                setChestPressWeight(chestPressWeight + 5);
              }}
              onStepperMinusClick={() => {
                setChestPressWeight(chestPressWeight - 5);
              }}
              value={chestPressWeight}
            />
            <Chip outline text={formatSeconds(chestPressTime)} />
          </div>
        </Block>
        <BlockTitle>Leg Press</BlockTitle>
        <Block strong outlineIos>
          <div className="grid grid-cols-3 grid-gap">
            <Button
              raised
              fill
              round
              onClick={() => {
                if (legPressTime > 0 && !isLegPressRunning) {
                  setLegPressTime(0);
                } else {
                  setIsLegPressRunning(!isLegPressRunning);
                }
              }}
            >
              {legPressTime > 0 && !isLegPressRunning
                ? "Reset"
                : isLegPressRunning
                ? "Stop"
                : "Start"}
            </Button>
            <Stepper
              onStepperPlusClick={() => {
                setLegPressWeight(legPressWeight + 5);
              }}
              onStepperMinusClick={() => {
                setLegPressWeight(legPressWeight - 5);
              }}
              value={legPressWeight}
            />
            <Chip outline text={formatSeconds(legPressTime)} />
          </div>
        </Block>
        <BlockTitle>Stats</BlockTitle>
        <Block strong outlineIos>
          Total Time <Chip outline text={formatSeconds(statTotalTime)} />
        </Block>
        <Block strong outlineIos>
          Total Weight Over Time{" "}
          <Chip outline text={`${statTotalWeightOverTime} lbs/s`} />
        </Block>
        {statTotalWeightOverTime > 9000 && (
          <Block strong outlineIos>
            Over 9000 <Chip outline text={"Yes"} />
          </Block>
        )}
      </Page>
    </App>
  );
};
