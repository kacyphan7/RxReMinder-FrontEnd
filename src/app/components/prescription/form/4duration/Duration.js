export default function FourDuration({formData, setFormData}) {
    function handleStartDate(e) {
        setFormData({ ...formData, startDate: e.target.value });
    }

    function handleEndDate(e) {
        setFormData({ ...formData, endDate: e.target.value });
    }

    return (
        <>
            <label htmlFor="name">Please select the start date and end date for this medication:</label>
            <div className="field">
                <input className="input" type="date" name="startDate" onChange={handleStartDate} value={formData['startDate']} />
            </div>
            <div className="field">
                <input className="input" type="date" name="endDate" onChange={handleEndDate} value={formData['endDate']} />
            </div>
        </>
    );
}