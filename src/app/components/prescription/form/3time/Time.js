export default function ThreeTime({formData, setFormData}) {
    function handleTime1(e) {
        setFormData({ ...formData, time1: e.target.value });
    }

    function handleTime2(e) {
        setFormData({ ...formData, time2: e.target.value });
    }

    function showTime2() {
        if (formData.freq === 'twice') {
            return (
                <div className="field">
                    <label htmlFor="name">What time would you like to take the second dose of this medication?</label>
                    <input className="input" type="time" name="time2" onChange={handleTime2} value={formData['time2']} />
                </div>
            );
        }
    }
    
    return (
        <>
            <div className="field">
                <label htmlFor="name">What time would you like to take this medication?</label>
                <input className="input" type="time" name="time1" onChange={handleTime1} value={formData['time1']} />
            </div>
            {showTime2()}
        </>
    );
}