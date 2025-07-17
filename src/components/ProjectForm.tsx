import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProjectFormData } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Upload } from 'lucide-react';

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  onSave: (data: ProjectFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const ProjectForm = ({ initialData, onSave, onCancel, isEditing = false }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData?.title || '',
    effort: initialData?.effort || 0,
    benefit: initialData?.benefit || 0,
    discoveryAndScope: initialData?.discoveryAndScope || '',
    complexityFactors: initialData?.complexityFactors || '',
    blockers: initialData?.blockers || '',
    needsAndDependencies: initialData?.needsAndDependencies || '',
    nextSteps: initialData?.nextSteps || '',
    researchFocus: initialData?.researchFocus || '',
    images: initialData?.images || [],
    attachments: initialData?.attachments || []
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newAttachmentName, setNewAttachmentName] = useState('');
  const [newAttachmentUrl, setNewAttachmentUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
  };

  const handleSliderChange = (field: 'effort' | 'benefit', value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  const addAttachment = () => {
    if (newAttachmentName.trim() && newAttachmentUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        attachments: [...(prev.attachments || []), {
          name: newAttachmentName.trim(),
          url: newAttachmentUrl.trim()
        }]
      }));
      setNewAttachmentName('');
      setNewAttachmentUrl('');
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">
          {isEditing ? 'Edit Project' : 'Create New Project'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Project Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Effort and Benefit Sliders */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Effort: {formData.effort}</Label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.effort}
                onChange={(e) => handleSliderChange('effort', parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>10</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Benefit: {formData.benefit}</Label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.benefit}
                onChange={(e) => handleSliderChange('benefit', parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* Text Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="discovery" className="text-sm font-medium">Discovery & Scope</Label>
              <Textarea
                id="discovery"
                value={formData.discoveryAndScope}
                onChange={(e) => setFormData(prev => ({ ...prev, discoveryAndScope: e.target.value }))}
                placeholder="Describe the project scope and discovery phase"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complexity" className="text-sm font-medium">Complexity Factors</Label>
              <Textarea
                id="complexity"
                value={formData.complexityFactors}
                onChange={(e) => setFormData(prev => ({ ...prev, complexityFactors: e.target.value }))}
                placeholder="List complexity factors and challenges"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blockers" className="text-sm font-medium">Blockers</Label>
              <Textarea
                id="blockers"
                value={formData.blockers}
                onChange={(e) => setFormData(prev => ({ ...prev, blockers: e.target.value }))}
                placeholder="Current blockers and impediments"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="needs" className="text-sm font-medium">Needs & Dependencies</Label>
              <Textarea
                id="needs"
                value={formData.needsAndDependencies}
                onChange={(e) => setFormData(prev => ({ ...prev, needsAndDependencies: e.target.value }))}
                placeholder="Required resources and dependencies"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextSteps" className="text-sm font-medium">Next Steps</Label>
              <Textarea
                id="nextSteps"
                value={formData.nextSteps}
                onChange={(e) => setFormData(prev => ({ ...prev, nextSteps: e.target.value }))}
                placeholder="Immediate next actions"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="research" className="text-sm font-medium">Research Focus</Label>
              <Textarea
                id="research"
                value={formData.researchFocus}
                onChange={(e) => setFormData(prev => ({ ...prev, researchFocus: e.target.value }))}
                placeholder="Areas requiring research and investigation"
                rows={3}
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Images</Label>
            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-20 object-cover rounded border border-border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 w-6 h-6 p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Image URL"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={addImage}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Attachments</Label>
            {formData.attachments && formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded border">
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {attachment.name}
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={newAttachmentName}
                onChange={(e) => setNewAttachmentName(e.target.value)}
                placeholder="Attachment name"
              />
              <Input
                value={newAttachmentUrl}
                onChange={(e) => setNewAttachmentUrl(e.target.value)}
                placeholder="Attachment URL"
              />
            </div>
            <Button type="button" variant="outline" onClick={addAttachment} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Attachment
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {isEditing ? 'Update Project' : 'Create Project'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};