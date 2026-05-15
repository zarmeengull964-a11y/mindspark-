import HeroSection from '../components/HeroSection';
import CourseCards from '../components/CourseCards';
import CodeEditorPromo from '../components/CodeEditorPromo';
import PdfNotesSection from '../components/PdfNotesSection';
import { PlusMember, CareerBand, TopTutorialsRefs } from '../components/HomeSections';
import {
  HtmlTutorialMerged,
  ExerciseAndList,
  ReferencesGrid,
  CertificationBand,
  TrackProgressShowcase,
} from '../components/LearningHub';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CourseCards limit={4} title="Start with the basics" />

      <PdfNotesSection />

      <CodeEditorPromo />

      <HtmlTutorialMerged />

      <ExerciseAndList />

      <ReferencesGrid />
   
      <CertificationBand />
     
      <TrackProgressShowcase />

      <TopTutorialsRefs />

      <PlusMember />
    </>
  );
}
