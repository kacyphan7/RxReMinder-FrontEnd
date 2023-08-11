import MedicationSearch from "../search/MedicationSearch";

export default function OneMedication({formData, setFormData}) {

    function handleQuantity(e) {
        setFormData({ ...formData, quantity: e.target.value });
    }

    return (
        <>
            <div className="field">
                <label htmlFor="name">What medication are you taking?</label>
                <MedicationSearch formData={formData} setFormData={setFormData} />
            </div>
            <div className="field">
                <label htmlFor="dosage">What is the amount per dose?</label>
                <input className="input" type="text" name="quantity" placeholder="Quantity" onChange={handleQuantity} value={formData['quantity']} />
            </div>
        </>
    );
}