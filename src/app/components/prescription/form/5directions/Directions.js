export default function FiveDirections({formData, setFormData}) {
    function handleNotes(e) {
        setFormData({ ...formData, notes: e.target.value });
    }

    return (
        <div className="field">
            <label htmlFor="notes">Any special directions for this medication?</label>
            <input className="input" type="text" name="notes" placeholder="Notes" onChange={handleNotes} />
        </div>
    );
}