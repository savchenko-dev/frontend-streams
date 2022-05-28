function minutes(min) {
  return min * 60;
}

class Timer {
  _currentTime = 0;
  _isPaused = false;
  _isRunned = false;

  _intervalId = null;

  _mode = 0; // 0 - Pomodoro, 1 - Break
  _pomodoroTime = minutes(2);
  _shortBreakTime = minutes(0.1);
  _longBreakTime = minutes(0.2);
  _longBreakPeriod = 4;
  _pomodoroCount = 0;

  _listenners = [];

  _tick = () => {
    if (this._currentTime > 0) {
      this._currentTime -= 1;
    } else {
      if (this._mode === 0) {
        this._pomodoroCount++;
        this._runBreak();
      } else {
        this._runPomodoro();
      }
    }

    this.notifyListenners();
  };

  _runPomodoro = () => {
    this._mode = 0;

    this._currentTime = this._pomodoroTime;
  };

  _runBreak = () => {
    this._mode = 1;

    if (this._pomodoroCount % this._longBreakPeriod === 0) {
      this._currentTime = this._longBreakTime;
    } else {
      this._currentTime = this._shortBreakTime;
    }
  };

  /**
   * @param {number} time
   */
  start = () => {
    this._currentTime = this._pomodoroTime;
    this._intervalId = window.setInterval(this._tick, 500);
    this._isPaused = false;
    this._isRunned = true;
    this.notifyListenners();
  };

  stop = () => {
    this._currentTime = this._pomodoroTime;
    window.clearInterval(this._intervalId);
    this._isPaused = false;
    this._isRunned = false;
    this.notifyListenners();
  };

  pause = () => {
    window.clearInterval(this._intervalId);
    this._isPaused = true;
    this._isRunned = false;
    this.notifyListenners();
  };

  resume = () => {
    this._intervalId = window.setInterval(this._tick, 500);
    this._isPaused = false;
    this._isRunned = true;
    this.notifyListenners();
  };

  subscribe = (callback) => {
    this._listenners.push(callback);
    return () => this._listenners.filter((cb) => cb != callback);
  };

  notifyListenners = () => {
    this._listenners.forEach((callback) => {
      callback({
        currentTime: this._currentTime,
        mode: this._mode,
        isPaused: this._isPaused,
        isRunned: this._isRunned,
      });
    });
  };
}

export default Timer;
