<p align="center">
<img src="public/assets/logo2.png">
</p>

# About
RxReMinder is a web application that helps users manage their medications. The application provides a variety of features, including:

- A prescription management system that allows users to track their prescriptions and set recurring reminders for medication doses.
- A user-driven medication database that provides classification and directions specific to medications.
- A dose tracking system that allows users to track upcoming, taken, and missed doses.
- A notification system that reminds users via email when it's time to take their medications.

RxReMinder is under development, but has the potential to be a valuable tool for anyone who takes medications. The application is easy to use and provides a variety of features that can help users stay on top of their medication.

## **Built With**
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![NODE.JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## Deployment
- Frontend deployed on [Netlify](https://rx-reminder.netlify.app/)
- Backend deployed on [Heroku](https://rxreminder-5f38ebd3ad7c.herokuapp.com/)
- Frontend Github Repo [Github](https://github.com/kacyphan7/RxReMinder-FrontEnd)
- Backend Github Repo [Github](https://github.com/Ellehcim23/RxReMinder-BE)

***

## Getting Started

### Prerequisites
* Node.js
* MongoDB database - local install or [Mongo Atlas](http://mongodb.com/atlas)
* A [Courier](https://app.courier.com/) API key

### Backend
1. `fork` and `clone` the [RxReMinder-BE](https://github.com/Ellehcim23/RxReMinder-BE) repository.
```zsh
git clone https://github.com/your-username/RxReMinder-BE.git
cd RxReMinder-BE
```
2. Install dependencies.
```zsh
npm install
```
3. Create a `.env` file in the repository root and add the follow environment variables:
```
MONGO_URI=insert-your-database-uri-here
JWT_SECRET=secret-key-of-your-choice
COURIER_KEY=your-courier-api-key-here
```
4. Start the backend server.
```zsh
npm run dev
```

### Database seeding (optional)
* Use the following command to pre-load your database with a provided collection of common medications.
```zsh
node seeders/medications.js
```

### Frontend
1. `fork` and `clone` the [RxReMinder-FrontEnd](https://github.com/kacyphan7/RxReMinder-FrontEnd) repository.
```zsh
git clone https://github.com/your-username/RxReMinder-FrontEnd
cd RxReMinder-FrontEnd
```
2. Install dependencies.
```zsh
npm install
```
3. Create a `.env` file in the repository root and add the following environment variable:
```
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
```
4. Start the frontend server.
```zsh
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) with your web browser to experience the app.

### Notification Engine
* Set up a recurring engine to run `node notifications.js` on the backend server.
* The deployed version of RxReMinder uses `Heroku Scheduler` for this purpose.
* Alternatives include `Netlify Functions` or simply `cron` where allowed.

***

# **Screenshots**
## Home
![Home](src/app/assets/home.png)
![Component1](src/app/assets/component1.png)
![Component2](src/app/assets/component2.png)

## Login
![Login](src/app/assets/login.png)

## Register
![Register](src/app/assets/register.png)

## Dashboard
![Dashboard](src/app/assets/dashboard.png)

## Profile
![Profile](src/app/assets/profile.png)

## Add Prescription
![Prescription](src/app/assets/prescription.png)

## Manage Prescription
![Manage Prescription](src/app/assets/manage-prescription.png)

## View Single Prescription
![View Single Prescription](src/app/assets/single-prescription.png)

## Medication
![Medication](src/app/assets/medication.png)

## Email Reminder 
![Email](src/app/assets/email.jpg)

***

# Frontend Code Snippets
* See the README in the [Backend Repo](https://github.com/Ellehcim23/RxReMinder-BE) for backend code snippets.

## Interdependent Dashboard Modules
```
// In Dashboard
const [refreshPercentage, setRefreshPercentage] = useState(false);
...
<DailyPercentage shouldRefresh={refreshPercentage} />
<DayDoses onDoseTaken={setRefreshPercentage} />
...
// In DailyPercentage component
const DailyPercentage = ({ shouldRefresh }) => {
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/doses/dailypercentage`)
            .then(response => {
                if (response.data !== null) {
                    setPercentage(response.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the percentage data: ", error);
                setLoading(false);
            });
    }, [user, shouldRefresh]);

    useEffect(() => {
        if (!loading) {
            let ctx = document.getElementById('doughnut-chart').getContext('2d');
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            ...
            chartRef.current = new Chart(ctx, {
                ...
            });
        }
    }, [loading, percentage]);
}
```
## Weekly Progress Bar Chart
```
 const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const sunWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const monWeek = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"];
    const tuesWeek = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
    const wedWeek = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
    const thurWeek = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    const friWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const satWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const today = new Date().getDay();
    let weekLabel;

    switch (daysOfWeek[today]) {
        case "Sunday": weekLabel = sunWeek; break;
        case "Monday": weekLabel = monWeek; break;
        case "Tuesday": weekLabel = tuesWeek; break;
        case "Wednesday": weekLabel = wedWeek; break;
        case "Thursday": weekLabel = thurWeek; break;
        case "Friday": weekLabel = friWeek; break;
        case "Saturday": weekLabel = satWeek; break;
    }

    ...

    useEffect(() => {
        if (percentage) {
            let ctx = document.getElementById('myChart').getContext('2d');
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            percentage.forEach((item) => {
                item = item + '%'
            });
            Chart.register(gradient)
            Chart.defaults.scale.grid.lineWidth = 0
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: weekLabel,
                ...
                }
            });
        }
    }, [percentage, weekLabel]);
```

## Multi-Step New Prescription Form
```
const [formData, setFormDate] = useState({
    medId: '',
    quantity: '',
    freq: '',
    time1: '',
    time2: '',
    startDate: '',
    endDate: '',
    notes: '',
    timezone: (new Date().getTimezoneOffset()) / 60,
});

function setFormData(newFormData) {
    setFormDate({ ...formData, ...newFormData });
}

const conditionalComponent = () => {
    switch (page) {
        case 0:
            return <OneMedication formData={formData} setFormData={setFormData} />;
        case 1:
            return <TwoFrequency formData={formData} setFormData={setFormData} />;
        case 2:
            return <ThreeTime formData={formData} setFormData={setFormData} />;
        case 3:
            return <FourDuration formData={formData} setFormData={setFormData} />;
        case 4:
            return <FiveDirections formData={formData} setFormData={setFormData} />;
        default:
            return <OneMedication formData={formData} setFormData={setFormData} />;
    }
};
...
<h1>Add Prescription</h1>
<div className={styles.formSection}>
    {error ? <p>There was an error submitting your form. Please try again.</p> : null}
    {conditionalComponent()}
    {page > 0 && <button className="button" onClick={() => setPage(page - 1)}>Back</button>}
    <button className="button" onClick={handleSubmit}>{page < 4 ? "Next" : "Submit"}</button>
</div>
...
// In OneMedication component
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
...
// In TwoFrequency component
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

```

***

# Wireframe and Entity Relationship Diagram
<img src="src/app/assets/uiZard.png">
<img src="public/assets/initial-wireframe.png">

# Future Enhancements 
- QR Code for each prescription
- Health Insurance Information
- Medications Generic and Brand Name
- Medication Side Effects
- Medication Interactions
- Health Care Provider 

### Stretch Goals
If permitted by legal we would like to essentially partnered with pharmacists to get the prescription information to automatically be entered into our database with user permission. This will allow the user to have a more seamless experience with their refill automatically being added to their profile.

# Resources
- [Chart JS](https://www.chartjs.org/) - A JavaScript library for creating beautiful charts.
- [Courier](https://www.courier.com/) - A notification platform that helps developers add notifications to their applications.
- [Faker](https://fakerjs.dev/guide/) - A library for generating fake data.
- [Font Awesome](https://fontawesome.com/v4/get-started/) - An iconic font and CSS toolkit.
- [uiZard](https://uizard.io/) - A platform that uses AI to transform your hand-drawn wireframes into code.

# License 
The source code for the site is licensed under the MIT license, which you can find in the MIT-LICENSE.txt file.

<h2 align="center">Authors</h2>

<div align="center">
  <a href="https://github.com/darkartaudio">
    <img src="https://avatars.githubusercontent.com/u/122388609?v=4"
      alt="Contributors"
      width="15%" />
  </a>
   <a href="https://github.com/Ellehcim23">
    <img src="https://avatars.githubusercontent.com/u/125413734?v=4"
      alt="Contributors"
      width="15%" />
  </a>
    <a href="https://github.com/kacyphan7">
    <img src="https://avatars.githubusercontent.com/u/125235721?v=4"
      alt="Contributors"
      width="15%" />
  </a>
   <a href="https://github.com/sp1441">
    <img src="https://avatars.githubusercontent.com/u/125446289?v=4"
      alt="Contributors"
      width="15%" />
  </a>
</div>