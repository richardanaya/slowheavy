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

  const [log, setLog] = useState(
    JSON.parse(localStorage.getItem("exercise_log") || "[]") || []
  );

  const [pullDownWeight, setPullDownWeight] = useState(0);
  const [chestPressWeight, setChestPressWeight] = useState(0);
  const [legPressWeight, setLegPressWeight] = useState(0);
  const [seatedRowWeight, setSeatedRowWeight] = useState(0);
  const [overheadPressWeight, setOverheadPressWeight] = useState(0);

  const [gymStartTime, setGymStartTime] = useState<Date | undefined>(undefined);
  const [pullDownTime, setPullDownTime] = useState(0);
  const [chestPressTime, setChestPressTime] = useState(0);
  const [legPressTime, setLegPressTime] = useState(0);
  const [seatedRowTime, setSeatedRowTime] = useState(0);
  const [overheadPressTime, setOverheadPressTime] = useState(0);

  const [isPullDownRunning, setIsPullDownRunning] = useState(false);
  const [isChestPressRunning, setIsChestPressRunning] = useState(false);
  const [isLegPressRunning, setIsLegPressRunning] = useState(false);
  const [isSeatedRowRunning, setIsSeatedRowRunning] = useState(false);
  const [isOverheadPressRunning, setIsOverheadPressRunning] = useState(false);

  const formatSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} min ${remainingSeconds} sec`;
  };

  useEffect(() => {
    if (isPullDownRunning) {
      const interval = setInterval(() => {
        // if over 2 min 30 sec, stop
        if (pullDownTime >= 150) {
          setIsPullDownRunning(false);
        }
        setPullDownTime(pullDownTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPullDownRunning, pullDownTime]);

  useEffect(() => {
    if (isChestPressRunning) {
      const interval = setInterval(() => {
        if (chestPressTime >= 150) {
          setIsChestPressRunning(false);
        }
        setChestPressTime(chestPressTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isChestPressRunning, chestPressTime]);

  useEffect(() => {
    if (isLegPressRunning) {
      const interval = setInterval(() => {
        if (legPressTime >= 150) {
          setIsLegPressRunning(false);
        }
        setLegPressTime(legPressTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLegPressRunning, legPressTime]);

  useEffect(() => {
    if (isSeatedRowRunning) {
      const interval = setInterval(() => {
        if (seatedRowTime >= 150) {
          setIsSeatedRowRunning(false);
        }
        setSeatedRowTime(seatedRowTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSeatedRowRunning, seatedRowTime]);

  useEffect(() => {
    if (isOverheadPressRunning) {
      const interval = setInterval(() => {
        if (overheadPressTime >= 150) {
          setIsOverheadPressRunning(false);
        }
        setOverheadPressTime(overheadPressTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOverheadPressRunning, overheadPressTime]);

  const statTotalTime =
    pullDownTime +
    chestPressTime +
    legPressTime +
    seatedRowTime +
    overheadPressTime;
  const statTotalWeightOverTime =
    pullDownWeight * pullDownTime +
    chestPressWeight * chestPressTime +
    legPressWeight * legPressTime +
    seatedRowWeight * seatedRowTime +
    overheadPressWeight * overheadPressTime;

  return (
    <App>
      <Page>
        <Navbar title="Slow Heavy" />
        <Block strong outlineIos>
          <Button
            raised
            fill
            round
            onClick={() => {
              if (gymStartTime === undefined) {
                setGymStartTime(new Date());
              } else {
                const end = new Date();
                const entry = {
                  time: new Date().toISOString(),
                  totalGymTime:
                    end.getTime() / 1000 - gymStartTime.getTime() / 1000,
                  pullDown: { weight: pullDownWeight, time: pullDownTime },
                  chestPress: {
                    weight: chestPressWeight,
                    time: chestPressTime,
                  },
                  legPress: { weight: legPressWeight, time: legPressTime },
                  seatedRow: { weight: seatedRowWeight, time: seatedRowTime },
                  overheadPress: {
                    weight: overheadPressWeight,
                    time: overheadPressTime,
                  },
                };

                // save to exercise_log array in localStorage
                const exerciseLog = JSON.parse(
                  localStorage.getItem("exercise_log") || "[]"
                );
                exerciseLog.push(entry);
                localStorage.setItem(
                  "exercise_log",
                  JSON.stringify(exerciseLog)
                );
                setLog(exerciseLog);
                setGymStartTime(undefined);
              }
            }}
          >
            {gymStartTime !== undefined ? "End Workout" : "Start Workout"}
          </Button>
        </Block>
        <BlockTitle>Pulldown</BlockTitle>
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
        <BlockTitle>Seated Row</BlockTitle>
        <Block strong outlineIos>
          <div className="grid grid-cols-3 grid-gap">
            <Button
              raised
              fill
              round
              onClick={() => {
                if (seatedRowTime > 0 && !isSeatedRowRunning) {
                  setSeatedRowTime(0);
                } else {
                  setIsSeatedRowRunning(!isSeatedRowRunning);
                }
              }}
            >
              {seatedRowTime > 0 && !isSeatedRowRunning
                ? "Reset"
                : isSeatedRowRunning
                ? "Stop"
                : "Start"}
            </Button>
            <Stepper
              onStepperPlusClick={() => {
                setSeatedRowWeight(seatedRowWeight + 5);
              }}
              onStepperMinusClick={() => {
                setSeatedRowWeight(seatedRowWeight - 5);
              }}
              value={seatedRowWeight}
            />
            <Chip outline text={formatSeconds(seatedRowTime)} />
          </div>
        </Block>
        <BlockTitle>Overhead Press</BlockTitle>
        <Block strong outlineIos>
          <div className="grid grid-cols-3 grid-gap">
            <Button
              raised
              fill
              round
              onClick={() => {
                if (overheadPressTime > 0 && !isOverheadPressRunning) {
                  setOverheadPressTime(0);
                } else {
                  setIsOverheadPressRunning(!isOverheadPressRunning);
                }
              }}
            >
              {overheadPressTime > 0 && !isOverheadPressRunning
                ? "Reset"
                : isOverheadPressRunning
                ? "Stop"
                : "Start"}
            </Button>
            <Stepper
              onStepperPlusClick={() => {
                setOverheadPressWeight(overheadPressWeight + 5);
              }}
              onStepperMinusClick={() => {
                setOverheadPressWeight(overheadPressWeight - 5);
              }}
              value={overheadPressWeight}
            />
            <Chip outline text={formatSeconds(overheadPressTime)} />
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
        <BlockTitle>Log</BlockTitle>
        <Block strong outlineIos>
          <Block>
            {log.map((entry: any, i: number) => (
              <div>
                <Chip
                  outline
                  text={new Date(entry.time).toLocaleDateString()}
                />
                <br />
                <Chip
                  outline
                  text={`Score: ${Math.round(
                    (entry.pullDown.weight * entry.pullDown.time +
                      entry.chestPress.weight * entry.chestPress.time +
                      entry.legPress.weight * entry.legPress.time +
                      entry.seatedRow.weight * entry.seatedRow.time +
                      entry.overheadPress.weight * entry.overheadPress.time -
                      (entry.totalGymTime -
                        entry.pullDown.time -
                        entry.chestPress.time -
                        entry.legPress.time -
                        entry.seatedRow.time -
                        entry.overheadPress.time)) /
                      1000
                  )}`}
                />
                <br />
                <Chip
                  outline
                  text={`Total Weight Over Time : ${
                    entry.pullDown.weight * entry.pullDown.time +
                    entry.chestPress.weight * entry.chestPress.time +
                    entry.legPress.weight * entry.legPress.time +
                    entry.seatedRow.weight * entry.seatedRow.time +
                    entry.overheadPress.weight * entry.overheadPress.time
                  } lbs/s`}
                />
                <br />
                <Chip
                  outline
                  text={`Total Gym Time: ${formatSeconds(entry.totalGymTime)}`}
                />
                <br />
                <Chip
                  outline
                  text={`Total Non-Exercise Time: ${formatSeconds(
                    entry.totalGymTime -
                      entry.pullDown.time -
                      entry.chestPress.time -
                      entry.legPress.time -
                      entry.seatedRow.time -
                      entry.overheadPress.time
                  )}`}
                />
                <br />
                <Chip
                  outline
                  text={`Pulldown: ${
                    entry.pullDown.weight
                  } lbs for ${formatSeconds(entry.pullDown.time)}`}
                />
                <br />
                <Chip
                  outline
                  text={`Chest Press: ${
                    entry.chestPress.weight
                  } lbs for ${formatSeconds(entry.chestPress.time)}`}
                />
                <br />
                <Chip
                  outline
                  text={`Leg Press: ${
                    entry.legPress.weight
                  } lbs for ${formatSeconds(entry.legPress.time)}`}
                />
                <br />
                <Chip
                  outline
                  text={`Seated Row: ${
                    entry.seatedRow.weight
                  } lbs for ${formatSeconds(entry.seatedRow.time)}`}
                />
                <br />
                <Chip
                  outline
                  text={`Overhead Press: ${
                    entry.overheadPress.weight
                  } lbs for ${formatSeconds(entry.overheadPress.time)}`}
                />
                <br />
                <br />
                <Button
                  outline
                  round
                  small
                  color="red"
                  onClick={() => {
                    const newLog = log.filter((_: any, j: number) => i !== j);
                    localStorage.setItem(
                      "exercise_log",
                      JSON.stringify(newLog)
                    );
                    setLog(newLog);
                  }}
                >
                  Delete
                </Button>
                <br />
                <br />
              </div>
            ))}
          </Block>
        </Block>
      </Page>
    </App>
  );
};
