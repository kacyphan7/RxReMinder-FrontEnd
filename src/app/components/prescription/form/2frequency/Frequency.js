export default function TwoFrequency({formData, setFormData}) {
    function handleFreq(e) {
        setFormData({ ...formData, freq: e.target.value });
    }
    
    return (
        <div className="field">
            <label htmlFor="name">How often would you like to take this medication?</label>
            <select className="input" name="freq" onChange={handleFreq} value={formData['freq']}>
                <option value="one">Once a Day</option>
                <option value="two">Twice a Day</option>
                <option value="alternate">Every Other Day</option>
                <option value="week">Once a Week</option>
            </select>
        </div>
    );
}