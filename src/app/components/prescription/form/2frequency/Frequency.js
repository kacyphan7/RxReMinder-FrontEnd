import { useEffect } from "react";

export default function TwoFrequency({formData, setFormData}) {
    function handleFreq(e) {
        setFormData({ ...formData, freq: e.target.value });
    }

    useEffect(() => {
        // effectively makes the default value 'once a day'
        if (formData['freq'] === '') {
            setFormData({ ...formData, freq: 'once' });
        }
    }, []);
    
    return (
        <div className="field">
            <label htmlFor="name">How often would you like to take this medication?</label>
            <select className="input" name="freq" onChange={handleFreq} value={formData['freq']}>
                <option value="once">Once a Day</option>
                <option value="twice">Twice a Day</option>
                <option value="alternate">Every Other Day</option>
                <option value="weekly">Once a Week</option>
            </select>
        </div>
    );
}