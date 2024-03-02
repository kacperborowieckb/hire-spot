type ScheduleFieldSetProps = {
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ScheduleFieldSet({
  handleTimeChange,
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
    </fieldset>
  );
}
