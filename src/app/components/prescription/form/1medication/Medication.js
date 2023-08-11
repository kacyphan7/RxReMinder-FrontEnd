export default function OneMedication({formData, setFormData}) {
    function handleMedId(e) {
        setFormData({ ...formData, medId: e.target.value });
    }

    function handleQuantity(e) {
        setFormData({ ...formData, quantity: e.target.value });
    }

    return (
        <>
            <div className="field">
                <label htmlFor="name">What medication are you taking?</label>
                <input className="input" type="text" name="medId" placeholder="Medication Name" onChange={handleMedId} value={formData['medId']} />
            </div>
            <div className="field">
                <label htmlFor="dosage">What is the amount per dose?</label>
                <input className="input" type="text" name="quantity" placeholder="Quantity" onChange={handleQuantity} value={formData['quantity']} />
            </div>
        </>
    );
}