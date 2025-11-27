
import React, { useState } from 'react';
import { EducationalStage, Language, GenerationMode } from '../types';
import { ArrowRight, Pencil, ArrowLeft, Wand2, BookOpen } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface InputFormProps {
  stage: EducationalStage;
  mode: GenerationMode;
  onSubmit: (grade: string, subject: string, topic: string, additionalInfo?: string) => void;
  onBack: () => void;
  isLoading: boolean;
  language: Language;
}

const InputForm: React.FC<InputFormProps> = ({ stage, mode, onSubmit, onBack, isLoading, language }) => {
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (grade && subject && topic) {
      onSubmit(grade, subject, topic, additionalInfo);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-xl border-t-4 border-brand-dark p-12 mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-10 border-b border-brand-border pb-6">
        <div>
            <h2 className="text-3xl font-bold text-brand-dark uppercase tracking-tight">{t.configTitle}</h2>
            <p className="text-brand-main text-sm mt-1 font-medium tracking-wide">
                {t.selectedStage} <span className="text-brand-dark border-b border-brand-teal mr-3">{t.stageLabels[stage]}</span>
                <span className="text-gray-400 font-light text-xs uppercase bg-gray-100 px-2 py-1 rounded">{mode === 'auto' ? 'Modo Auto' : 'Modo Manual'}</span>
            </p>
        </div>
        <button 
            onClick={onBack} 
            className="text-gray-400 hover:text-brand-dark transition-colors flex items-center text-xs uppercase font-bold tracking-widest border border-gray-200 px-3 py-2 hover:border-brand-dark"
        >
            <ArrowLeft size={14} className="mr-2" />
            {t.changeBtn}
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group">
            <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2 group-focus-within:text-brand-blue transition-colors">
                {t.gradeLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={t.gradePlaceholder}
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-brand-dark placeholder-gray-400 rounded-sm"
            />
          </div>
          <div className="group">
            <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2 group-focus-within:text-brand-blue transition-colors">
                {t.subjectLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={t.subjectPlaceholder}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-brand-dark placeholder-gray-400 rounded-sm"
            />
          </div>
        </div>

        <div className="group">
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2 group-focus-within:text-brand-blue transition-colors">
            {t.topicLabel} <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder={t.topicPlaceholder}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-brand-dark placeholder-gray-400 resize-none rounded-sm"
          />
        </div>

        {/* Specific Competencies / Basic Knowledge Input (Only for Auto Mode) */}
        {mode === 'auto' && (
          <div className="group bg-blue-50/50 p-4 border border-blue-100 rounded-sm">
             <label className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-wider mb-2 group-focus-within:text-brand-dark transition-colors">
                <BookOpen size={14} className="mr-2" />
                {language === 'es' ? 'Enfoque Curricular Específico (Opcional)' : 'Fokuratze Kurrikular Berezia (Aukerakoa)'}
             </label>
             <p className="text-[10px] text-gray-500 mb-2">
                {language === 'es' 
                  ? 'Si quieres trabajar unas competencias, criterios o saberes concretos, escríbelos aquí y la IA los priorizará.' 
                  : 'Konpetentzia, irizpide edo jakintza zehatz batzuk landu nahi badituzu, idatzi hemen eta AAk lehenetsiko ditu.'}
             </p>
             <textarea
                rows={3}
                placeholder={language === 'es' 
                  ? "Ej: Competencia digital, resolución de problemas matemáticos, el ciclo del agua..." 
                  : "Adib: Konpetentzia digitala, arazo matematikoen ebazpena, uraren zikloa..."}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-blue-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all text-brand-dark placeholder-gray-400 resize-none rounded-sm text-sm"
             />
          </div>
        )}

        <div className="pt-6">
            <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center space-x-3 py-5 px-6 text-white font-bold text-lg uppercase tracking-widest transition-all rounded-sm ${
                isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : mode === 'auto' 
                    ? 'bg-brand-teal hover:bg-brand-main shadow-lg hover:shadow-xl' 
                    : 'bg-brand-dark hover:bg-brand-black shadow-lg hover:shadow-xl'
            }`}
            >
            {isLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t.loadingBtn}</span>
                </>
            ) : (
                <>
                {mode === 'auto' ? <Wand2 size={20} /> : <Pencil size={20} className="text-brand-teal" />}
                <span>{mode === 'auto' ? t.generateBtnAuto : t.generateBtnManual}</span>
                <ArrowRight size={20} />
                </>
            )}
            </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
