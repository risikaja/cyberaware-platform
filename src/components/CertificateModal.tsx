import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Download, Shield } from "lucide-react";
import { toast } from "sonner";

export function CertificateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 16, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-2xl shadow-elegant max-w-2xl w-full overflow-hidden"
          >
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Compliance Certificate Preview</h3>
              </div>
              <button onClick={onClose} className="p-1 rounded hover:bg-secondary">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Certificate */}
            <div className="p-8 bg-gradient-to-br from-secondary/40 to-card">
              <div className="relative bg-card border-4 border-double border-primary/40 rounded-lg p-10 text-center">
                {/* corner ornaments */}
                <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-primary/60 rounded-tl" />
                <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-primary/60 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-primary/60 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-primary/60 rounded-br" />

                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-cyber flex items-center justify-center shadow-glow">
                  <Shield className="w-7 h-7 text-primary-foreground" />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Certificate of Completion</p>
                <h2 className="text-3xl font-bold font-display mb-1">Cybersecurity Awareness Program</h2>
                <p className="text-sm text-muted-foreground mb-8">This certifies that</p>

                <p className="text-2xl font-display font-bold text-primary mb-2">Alex Morgan</p>
                <div className="w-32 h-px bg-border mx-auto mb-6" />
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
                  has successfully completed all required modules of the CyberAware Enterprise
                  Security Training Program with a final score of <span className="text-foreground font-semibold">96%</span>.
                </p>

                <div className="flex justify-between items-end pt-6 text-xs text-muted-foreground">
                  <div className="text-left">
                    <div className="w-32 border-t border-border pt-1">Issued</div>
                    <div className="text-foreground font-medium">Apr 22, 2026</div>
                  </div>
                  <div className="text-2xl font-display font-bold text-primary">A+</div>
                  <div className="text-right">
                    <div className="w-32 border-t border-border pt-1">CyberAware Inc.</div>
                    <div className="text-foreground font-medium">Verified ✓</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm hover:bg-secondary">Close</button>
              <button
                onClick={() => {
                  toast.success("Certificate downloaded", { description: "Saved as Alex_Morgan_Certificate.pdf" });
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-elegant"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
