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

interface IWorkoutEntry {
  time: string;
  totalGymTime: number;
  pullDown: {
    weight: number;
    reps: number;
    time: number;
  };
  chestPress: {
    weight: number;
    reps: number;
    time: number;
  };
  legPress: {
    weight: number;
    reps: number;
    time: number;
  };
  seatedRow: {
    weight: number;
    reps: number;
    time: number;
  };
  overheadPress: {
    weight: number;
    reps: number;
    time: number;
  };
}

function calculateScore(entry: IWorkoutEntry) {
  return Math.round(
    ((entry.pullDown.weight * entry.pullDown.time) / entry.pullDown.reps +
      (entry.chestPress.weight * entry.chestPress.time) /
        entry.chestPress.reps +
      (entry.legPress.weight * entry.legPress.time) / entry.legPress.reps +
      (entry.seatedRow.weight * entry.seatedRow.time) / entry.seatedRow.reps +
      (entry.overheadPress.weight * entry.overheadPress.time) /
        entry.overheadPress.reps -
      (entry.totalGymTime -
        entry.pullDown.time -
        entry.chestPress.time -
        entry.legPress.time -
        entry.seatedRow.time -
        entry.overheadPress.time)) /
      1000
  );
}

function localStorageGetOr(key: string, defaultValue: number) {
  const keyValue = localStorage.getItem(key);
  return keyValue ? JSON.parse(keyValue) : defaultValue;
}

export default () => {
  // lets make an exercise tracker that tracks the number of seconds we do an exercise at a certain weight

  const [log, setLog] = useState<IWorkoutEntry[]>(
    JSON.parse(localStorage.getItem("exercise_log") || "[]") || []
  );

  const [pullDownWeight, setPullDownWeight] = useState(
    localStorageGetOr("last_pull_down_weight", 100)
  );
  const [chestPressWeight, setChestPressWeight] = useState(
    localStorageGetOr("last_chest_press_weight", 100)
  );
  const [legPressWeight, setLegPressWeight] = useState(
    localStorageGetOr("last_leg_press_weight", 100)
  );
  const [seatedRowWeight, setSeatedRowWeight] = useState(
    localStorageGetOr("last_seated_row_weight", 100)
  );
  const [overheadPressWeight, setOverheadPressWeight] = useState(
    localStorageGetOr("last_overhead_press_weight", 100)
  );

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

  const [pullDownReps, setPullDownReps] = useState(
    localStorageGetOr("last_pull_down_reps", 4)
  );
  const [chestPressReps, setChestPressReps] = useState(
    localStorageGetOr("last_chest_press_reps", 4)
  );
  const [legPressReps, setLegPressReps] = useState(
    localStorageGetOr("last_leg_press_reps", 4)
  );
  const [seatedRowReps, setSeatedRowReps] = useState(
    localStorageGetOr("last_seated_row_reps", 4)
  );
  const [overheadPressReps, setOverheadPressReps] = useState(
    localStorageGetOr("last_overhead_press_reps", 4)
  );

  const formatSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} min ${remainingSeconds} sec`;
  };

  useEffect(() => {
    localStorage.setItem("last_pull_down_weight", pullDownWeight);
    localStorage.setItem("last_chest_press_weight", chestPressWeight);
    localStorage.setItem("last_leg_press_weight", legPressWeight);
    localStorage.setItem("last_seated_row_weight", seatedRowWeight);
    localStorage.setItem("last_overhead_press_weight", overheadPressWeight);
    localStorage.setItem("last_pull_down_reps", pullDownReps);
    localStorage.setItem("last_chest_press_reps", chestPressReps);
    localStorage.setItem("last_leg_press_reps", legPressReps);
    localStorage.setItem("last_seated_row_reps", seatedRowReps);
    localStorage.setItem("last_overhead_press_reps", overheadPressReps);
  }, [
    pullDownWeight,
    chestPressWeight,
    legPressWeight,
    seatedRowWeight,
    overheadPressWeight,
    pullDownReps,
    chestPressReps,
    legPressReps,
    seatedRowReps,
    overheadPressReps,
  ]);

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
  const statTotalReps =
    pullDownReps +
    chestPressReps +
    legPressReps +
    seatedRowReps +
    overheadPressReps;

  const end = new Date();
  const currentEntry: IWorkoutEntry | undefined = gymStartTime
    ? {
        time: new Date().toISOString(),
        totalGymTime: end.getTime() / 1000 - gymStartTime.getTime() / 1000,
        pullDown: {
          weight: pullDownWeight,
          reps: pullDownReps,
          time: pullDownTime,
        },
        chestPress: {
          weight: chestPressWeight,
          reps: chestPressReps,
          time: chestPressTime,
        },
        legPress: {
          weight: legPressWeight,
          reps: legPressReps,
          time: legPressTime,
        },
        seatedRow: {
          weight: seatedRowWeight,
          reps: seatedRowReps,
          time: seatedRowTime,
        },
        overheadPress: {
          weight: overheadPressWeight,
          reps: overheadPressReps,
          time: overheadPressTime,
        },
      }
    : undefined;

  const isCurrentlyExercising =
    isPullDownRunning ||
    isChestPressRunning ||
    isLegPressRunning ||
    isSeatedRowRunning ||
    isOverheadPressRunning;

  return (
    <App>
      <Page>
        <Navbar title="Slow Heavy" />
        <Block strong outlineIos>
          <Button
            fill
            round
            onClick={() => {
              if (gymStartTime === undefined) {
                setGymStartTime(new Date());
              } else {
                if (currentEntry) {
                  // save to exercise_log array in localStorage
                  const exerciseLog = JSON.parse(
                    localStorage.getItem("exercise_log") || "[]"
                  );
                  exerciseLog.push(currentEntry);
                  localStorage.setItem(
                    "exercise_log",
                    JSON.stringify(exerciseLog)
                  );
                  setLog(exerciseLog);
                  setGymStartTime(undefined);
                }
              }
            }}
            disabled={isCurrentlyExercising}
          >
            {gymStartTime !== undefined
              ? `End Workout${
                  currentEntry
                    ? ` - Current Score ${calculateScore(currentEntry)}`
                    : ""
                }`
              : "Start Workout"}
          </Button>
        </Block>

        <BlockTitle>Workout</BlockTitle>
        <Block strong outlineIos className="text-align-center">
          <div className="grid grid-cols-3 grid-gap">
            <div>
              <small className="display-block">
                <b>Pulldown</b>
              </small>
              <Button
                fill={pullDownTime !== 0 && !isPullDownRunning}
                outline={pullDownTime === 0 || isPullDownRunning}
                round
                onClick={() => {
                  if (pullDownTime > 0 && !isPullDownRunning) {
                    setPullDownTime(0);
                  } else {
                    setIsPullDownRunning(!isPullDownRunning);
                  }
                }}
                disabled={
                  gymStartTime === undefined ||
                  (!isPullDownRunning && isCurrentlyExercising)
                }
              >
                {pullDownTime > 0 && !isPullDownRunning
                  ? formatSeconds(pullDownTime)
                  : isPullDownRunning
                  ? formatSeconds(pullDownTime)
                  : "Start"}
              </Button>
            </div>
            <div>
              <small className="display-block">Weight</small>
              <Stepper
                onStepperPlusClick={() => {
                  setPullDownWeight(pullDownWeight + 5);
                }}
                onStepperMinusClick={() => {
                  setPullDownWeight(pullDownWeight - 5);
                }}
                value={pullDownWeight}
              />
            </div>
            <div>
              <small className="display-block">Reps</small>
              <Stepper
                onStepperPlusClick={() => {
                  setPullDownReps(pullDownReps + 0.5);
                }}
                onStepperMinusClick={() => {
                  setPullDownReps(pullDownReps - 0.5);
                }}
                value={pullDownReps}
              />
            </div>
          </div>
        </Block>
        <Block strong outlineIos className="text-align-center">
          <div className="grid grid-cols-3 grid-gap">
            <div>
              <small className="display-block">
                <b>Chest Press</b>
              </small>
              <Button
                fill={chestPressTime !== 0 && !isChestPressRunning}
                outline={chestPressTime === 0 || isChestPressRunning}
                round
                onClick={() => {
                  if (chestPressTime > 0 && !isChestPressRunning) {
                    setChestPressTime(0);
                  } else {
                    setIsChestPressRunning(!isChestPressRunning);
                  }
                }}
                disabled={
                  gymStartTime === undefined ||
                  (!isChestPressRunning && isCurrentlyExercising)
                }
              >
                {chestPressTime > 0 && !isChestPressRunning
                  ? formatSeconds(chestPressTime)
                  : isChestPressRunning
                  ? formatSeconds(chestPressTime)
                  : "Start"}
              </Button>
            </div>
            <div>
              <small className="display-block">Weight</small>
              <Stepper
                onStepperPlusClick={() => {
                  setChestPressWeight(chestPressWeight + 5);
                }}
                onStepperMinusClick={() => {
                  setChestPressWeight(chestPressWeight - 5);
                }}
                value={chestPressWeight}
              />
            </div>
            <div>
              <small className="display-block">Reps</small>
              <Stepper
                onStepperPlusClick={() => {
                  setChestPressReps(chestPressReps + 0.5);
                }}
                onStepperMinusClick={() => {
                  setChestPressReps(chestPressReps - 0.5);
                }}
                value={chestPressReps}
              />
            </div>
          </div>
        </Block>
        <Block strong outlineIos className="text-align-center">
          <div className="grid grid-cols-3 grid-gap">
            <div>
              <small className="display-block">
                <b>Leg Press</b>
              </small>
              <Button
                fill={legPressTime !== 0 && !isLegPressRunning}
                outline={legPressTime === 0 || isLegPressRunning}
                round
                onClick={() => {
                  if (legPressTime > 0 && !isLegPressRunning) {
                    setLegPressTime(0);
                  } else {
                    setIsLegPressRunning(!isLegPressRunning);
                  }
                }}
                disabled={
                  gymStartTime === undefined ||
                  (!isLegPressRunning && isCurrentlyExercising)
                }
              >
                {legPressTime > 0 && !isLegPressRunning
                  ? formatSeconds(legPressTime)
                  : isLegPressRunning
                  ? formatSeconds(legPressTime)
                  : "Start"}
              </Button>
            </div>
            <div>
              <small className="display-block">Weight</small>
              <Stepper
                onStepperPlusClick={() => {
                  setLegPressWeight(legPressWeight + 5);
                }}
                onStepperMinusClick={() => {
                  setLegPressWeight(legPressWeight - 5);
                }}
                value={legPressWeight}
              />
            </div>
            <div>
              <small className="display-block">Reps</small>
              <Stepper
                onStepperPlusClick={() => {
                  setLegPressReps(legPressReps + 0.5);
                }}
                onStepperMinusClick={() => {
                  setLegPressReps(legPressReps - 0.5);
                }}
                value={legPressReps}
              />
            </div>
          </div>
        </Block>
        <Block strong outlineIos className="text-align-center">
          <div className="grid grid-cols-3 grid-gap">
            <div>
              <small className="display-block">
                <b>Seated Row</b>
              </small>
              <Button
                fill={seatedRowTime !== 0 && !isSeatedRowRunning}
                outline={seatedRowTime === 0 || isSeatedRowRunning}
                round
                onClick={() => {
                  if (seatedRowTime > 0 && !isSeatedRowRunning) {
                    setSeatedRowTime(0);
                  } else {
                    setIsSeatedRowRunning(!isSeatedRowRunning);
                  }
                }}
                disabled={
                  gymStartTime === undefined ||
                  (!isSeatedRowRunning && isCurrentlyExercising)
                }
              >
                {seatedRowTime > 0 && !isSeatedRowRunning
                  ? formatSeconds(seatedRowTime)
                  : isSeatedRowRunning
                  ? formatSeconds(seatedRowTime)
                  : "Start"}
              </Button>
            </div>
            <div>
              <small className="display-block">Weight</small>
              <Stepper
                onStepperPlusClick={() => {
                  setSeatedRowWeight(seatedRowWeight + 5);
                }}
                onStepperMinusClick={() => {
                  setSeatedRowWeight(seatedRowWeight - 5);
                }}
                value={seatedRowWeight}
              />
            </div>
            <div>
              <small className="display-block">Reps</small>
              <Stepper
                onStepperPlusClick={() => {
                  setSeatedRowReps(seatedRowReps + 0.5);
                }}
                onStepperMinusClick={() => {
                  setSeatedRowReps(seatedRowReps - 0.5);
                }}
                value={seatedRowReps}
              />
            </div>
          </div>
        </Block>
        <Block strong outlineIos className="text-align-center">
          <div className="grid grid-cols-3 grid-gap">
            <div>
              <small className="display-block">
                <b>Overhead Press</b>
              </small>
              <Button
                fill={overheadPressTime !== 0 && !isOverheadPressRunning}
                outline={overheadPressTime === 0 || isOverheadPressRunning}
                round
                onClick={() => {
                  if (overheadPressTime > 0 && !isOverheadPressRunning) {
                    setOverheadPressTime(0);
                  } else {
                    setIsOverheadPressRunning(!isOverheadPressRunning);
                  }
                }}
                disabled={
                  gymStartTime === undefined ||
                  (!isOverheadPressRunning && isCurrentlyExercising)
                }
              >
                {overheadPressTime > 0 && !isOverheadPressRunning
                  ? formatSeconds(overheadPressTime)
                  : isOverheadPressRunning
                  ? formatSeconds(overheadPressTime)
                  : "Start"}
              </Button>
            </div>
            <div>
              <small className="display-block">Weight</small>
              <Stepper
                onStepperPlusClick={() => {
                  setOverheadPressWeight(overheadPressWeight + 5);
                }}
                onStepperMinusClick={() => {
                  setOverheadPressWeight(overheadPressWeight - 5);
                }}
                value={overheadPressWeight}
              />
            </div>
            <div>
              <small className="display-block">Reps</small>
              <Stepper
                onStepperPlusClick={() => {
                  setOverheadPressReps(overheadPressReps + 0.5);
                }}
                onStepperMinusClick={() => {
                  setOverheadPressReps(overheadPressReps - 0.5);
                }}
                value={overheadPressReps}
              />
            </div>
          </div>
        </Block>

        <BlockTitle>Stats</BlockTitle>
        <Block strong outlineIos>
          Total Time <Chip outline text={formatSeconds(statTotalTime)} />
        </Block>
        <Block strong outlineIos>
          Total Weight Time{" "}
          <Chip outline text={`${statTotalWeightOverTime} lbs • s`} />
        </Block>
        <Block>
          Total Reps <Chip outline text={statTotalReps} />
        </Block>
        <Block>
          Total Weight Time per Rep
          <Chip outline text={statTotalWeightOverTime / statTotalReps} /> lbs •
          s / rep
        </Block>
        <BlockTitle>Log</BlockTitle>
        <Block strong outlineIos>
          <Block>
            {log.map((entry: IWorkoutEntry, i: number) => (
              <div>
                <Chip
                  outline
                  text={new Date(entry.time).toLocaleDateString()}
                />
                <br />
                <Chip outline text={`Score: ${calculateScore(entry)}`} />
                <br />
                <Chip
                  outline
                  text={`Total Weight Time : ${
                    entry.pullDown.weight * entry.pullDown.time +
                    entry.chestPress.weight * entry.chestPress.time +
                    entry.legPress.weight * entry.legPress.time +
                    entry.seatedRow.weight * entry.seatedRow.time +
                    entry.overheadPress.weight * entry.overheadPress.time
                  } lbs • s`}
                />
                <br />
                <Chip
                  outline
                  text={`Total Reps: ${
                    entry.pullDown.reps +
                    entry.chestPress.reps +
                    entry.legPress.reps +
                    entry.seatedRow.reps +
                    entry.overheadPress.reps
                  }`}
                />
                <br />
                <Chip
                  outline
                  text={`Total Weight Time per Rep: ${
                    (entry.pullDown.weight * entry.pullDown.time +
                      entry.chestPress.weight * entry.chestPress.time +
                      entry.legPress.weight * entry.legPress.time +
                      entry.seatedRow.weight * entry.seatedRow.time +
                      entry.overheadPress.weight * entry.overheadPress.time) /
                    (entry.pullDown.reps +
                      entry.chestPress.reps +
                      entry.legPress.reps +
                      entry.seatedRow.reps +
                      entry.overheadPress.reps)
                  } lbs • s / rep`}
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
                  } lbs for ${formatSeconds(entry.pullDown.time)}for ${
                    entry.pullDown.reps
                  } reps`}
                />
                <br />
                <Chip
                  outline
                  text={`Chest Press: ${
                    entry.chestPress.weight
                  } lbs for ${formatSeconds(entry.chestPress.time)} for ${
                    entry.chestPress.reps
                  } reps`}
                />
                <br />
                <Chip
                  outline
                  text={`Leg Press: ${
                    entry.legPress.weight
                  } lbs for ${formatSeconds(entry.legPress.time)} for ${
                    entry.legPress.reps
                  } reps`}
                />
                <br />
                <Chip
                  outline
                  text={`Seated Row: ${
                    entry.seatedRow.weight
                  } lbs for ${formatSeconds(entry.seatedRow.time)} for ${
                    entry.seatedRow.reps
                  } reps`}
                />
                <br />
                <Chip
                  outline
                  text={`Overhead Press: ${
                    entry.overheadPress.weight
                  } lbs for ${formatSeconds(entry.overheadPress.time)} for ${
                    entry.overheadPress.reps
                  } reps`}
                />
                <br />
                <br />
                <Button
                  outline
                  round
                  small
                  color="red"
                  onClick={() => {
                    const newLog = log.filter(
                      (_: IWorkoutEntry, j: number) => i !== j
                    );
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
