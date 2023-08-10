import Image from 'next/image';
// import styles from 'src/app/css/page.module.css';
import CustomCalendar from './components/calendar/Calender';

export default function Home() {
  return (
    <main>
      <CustomCalendar />
    </main>
  );
}
