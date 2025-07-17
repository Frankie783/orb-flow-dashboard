import { Button } from '@/components/ui/button';
import { Save, Download, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TopBarProps {
  onSave: () => void;
  onDownloadScreenshot: () => void;
}

export const TopBar = ({ onSave, onDownloadScreenshot }: TopBarProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    onSave();
    toast({
      title: "Saved Successfully",
      description: "All project data has been saved to local storage.",
    });
  };

  const handleScreenshot = () => {
    onDownloadScreenshot();
    toast({
      title: "Screenshot Downloaded",
      description: "Dashboard screenshot has been generated and downloaded.",
    });
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Project Dashboard
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleScreenshot}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Screenshot
          </Button>
        </div>
      </div>
    </div>
  );
};