type ScheduleFieldSetProps = {
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendConfirmation: boolean;
  setSendConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ScheduleFieldSet({
  handleTimeChange,
  sendConfirmation,
  setSendConfirmation,
}: ScheduleFieldSetProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <div className="flex gap-4">
        <input
          type="time"
          className="w-min rounded-md border border-main-400 bg-main-100 px-2 accent-main-400"
          id="pickTime"
          name="pickTime"
          onChange={(e) => handleTimeChange(e)}
        />
        <label htmlFor="pickTime">Interview time</label>
      </div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          className="w-4 accent-main-400"
          checked={sendConfirmation}
          id="sendConfirmation"
          name="sendConfirmation"
          onChange={() => setSendConfirmation(!sendConfirmation)}
        />
        <label htmlFor="sendConfirmation">Send e-mail with confirmation</label>
      </div>
    </fieldset>
  );
}
