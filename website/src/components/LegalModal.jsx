import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Shield, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  HardDrive, 
  Smartphone, 
  Scale 
} from 'lucide-react'

export default function LegalModal({ isOpen, onClose, initialTab = 'privacy' }) {
  const [selectedTab, setSelectedTab] = useState(null)
  const activeTab = selectedTab ?? initialTab
  const setActiveTab = (tab) => setSelectedTab(tab)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-3xl rounded-3xl bg-[#0D111A] border border-white/15 shadow-2xl overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* HEADER */}
          <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Scale size={20} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">PosturePal Legal Center</h2>
                <p className="text-xs sm:text-sm text-slate-400">Transparent policies for an air-gapped on-device AI trainer</p>
              </div>
            </div>
            <button 
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition" 
              onClick={onClose} 
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* TABS */}
          <div className="flex border-b border-white/10 bg-black/30 px-6 sm:px-8 gap-2 overflow-x-auto">
            <button
              className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                activeTab === 'privacy' 
                  ? 'border-sky-400 text-sky-400' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('privacy')}
            >
              <Shield size={15} />
              Privacy Policy
            </button>
            <button
              className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                activeTab === 'terms' 
                  ? 'border-sky-400 text-sky-400' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('terms')}
            >
              <FileText size={15} />
              Terms of Service
            </button>
            <button
              className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                activeTab === 'disclaimer' 
                  ? 'border-sky-400 text-sky-400' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('disclaimer')}
            >
              <AlertTriangle size={15} />
              Health & AI Disclaimer
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed">
            {/* ── PRIVACY POLICY ── */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-300">
                  <CheckCircle size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Core Privacy Guarantee:</strong>
                    Your camera feed never leaves your smartphone. Every video frame is processed purely in volatile RAM using on-device MediaPipe and TensorFlow Lite models, and is discarded in milliseconds after calculating joint angles. Zero video is ever saved or transmitted.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <Lock size={18} className="text-sky-400 mb-2" />
                    <div className="font-bold text-white text-xs">100% On-Device AI</div>
                    <div className="text-xs text-slate-400">Pose landmarking runs entirely on local CPU/NPU without cloud servers.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <HardDrive size={18} className="text-sky-400 mb-2" />
                    <div className="font-bold text-white text-xs">Local SQLite Database</div>
                    <div className="text-xs text-slate-400">Workout logs and reps are stored solely in an encrypted local database.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <Smartphone size={18} className="text-sky-400 mb-2" />
                    <div className="font-bold text-white text-xs">Zero Data Selling</div>
                    <div className="text-xs text-slate-400">We do not sell, rent, or monetize your biometric, exercise, or profile data.</div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-mono">01</span>
                    Information We Process
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-400">
                    <li><strong className="text-slate-200">Camera Stream:</strong> Used transiently and locally in volatile RAM to extract 33 spatial landmarks. Raw video or photos from workout camera sessions are never saved to disk or uploaded to any server.</li>
                    <li><strong className="text-slate-200">Account Credentials:</strong> If you create an account, credentials stay protected by local hash or token auth.</li>
                    <li><strong className="text-slate-200">Fitness & Profile Data:</strong> Voluntary inputs like weight, height, and fitness goals are stored locally on your device to personalize coaching cues.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-mono">02</span>
                    Audio & Voice Feedback
                  </h3>
                  <p className="text-slate-400">
                    Coach Juno voice feedback is synthesized either through local pre-rendered audio cues or device system Text-to-Speech (TTS). No audio recordings of your environment or voice are captured or stored.
                  </p>
                </div>
              </div>
            )}

            {/* ── TERMS OF SERVICE ── */}
            {activeTab === 'terms' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <FileText size={18} className="text-sky-400 mb-2" />
                    <div className="font-bold text-white text-xs">Personal Fitness License</div>
                    <div className="text-xs text-slate-400">Granted for individual personal health, posture, and athletic training.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <Shield size={18} className="text-sky-400 mb-2" />
                    <div className="font-bold text-white text-xs">Safe Training Space</div>
                    <div className="text-xs text-slate-400">User agrees to clear a safe 2m × 2m area free of obstacles before exercising.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <Scale size={18} className="text-sky-400 mb-2" />
                    <div className="font-bold text-white text-xs">Account Safeguard</div>
                    <div className="text-xs text-slate-400">You are responsible for safeguarding your personal login credentials.</div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-mono">01</span>
                    Agreement to Terms
                  </h3>
                  <p className="text-slate-400">
                    By downloading, installing, or using PosturePal, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the application immediately.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-mono">02</span>
                    Permitted Use & Intellectual Property
                  </h3>
                  <p className="text-slate-400">
                    PosturePal grants you a revocable, non-exclusive personal license to use the app. All neural network weights, computer vision heuristics, and voice assets remain the sole property of PosturePal.
                  </p>
                </div>
              </div>
            )}

            {/* ── HEALTH & AI DISCLAIMER ── */}
            {activeTab === 'disclaimer' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-300">
                  <AlertTriangle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Important Medical Notice:</strong>
                    PosturePal is an AI-powered fitness feedback software tool. It is not a licensed medical professional, medical device, physiotherapist, or certified clinical diagnostic equipment.
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono">01</span>
                    Consult Your Physician
                  </h3>
                  <p className="text-slate-400">
                    Physical exercise involves inherent risk of physical injury. You should always consult with a qualified medical professional or physician prior to beginning any new exercise routine, especially if you have pre-existing cardiovascular, spinal, orthopedic, or joint conditions.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono">02</span>
                    Limitations of Optical Pose Estimation
                  </h3>
                  <p className="text-slate-400">
                    PosturePal uses cutting-edge optical landmark tracking, but camera angles, lighting conditions, clothing, and distance from device may affect precision. Voice alerts and form corrections are intended as helpful guidance and should never override your own physical sensation or discomfort.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 sm:px-8 border-t border-white/10 flex items-center justify-between bg-black/40">
            <span className="text-xs text-slate-500">Last updated: November 2026 · PosturePal Legal</span>
            <button 
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide transition shadow-lg shadow-sky-500/20"
              onClick={onClose}
            >
              I Understand & Agree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
