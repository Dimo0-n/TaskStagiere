import PropTypes from 'prop-types';
import ComplaintTemplate from '../templates/ComplaintTemplate.jsx';
import PowerOfAttorneyTemplate from '../templates/PowerOfAttorneyTemplate.jsx';
import StatementOfClaimTemplate from '../templates/StatementOfClaimTemplate.jsx';
import { useFormatting } from '../../context/useFormatting.js';

const templates = {
  complaint: ComplaintTemplate,
  procura: PowerOfAttorneyTemplate,
  'statement-of-claim': StatementOfClaimTemplate,
};

function DocumentPreview({ documentTypeId, data }) {
  const Template = templates[documentTypeId] ?? ComplaintTemplate;
  const { previewStyles } = useFormatting();

  return (
    <div className="bg-legal-50 px-4 py-6">
      <div className="overflow-x-auto pb-2">
        <div className="legal-preview-page mx-auto bg-white shadow-soft" style={previewStyles}>
          <Template data={data} />
        </div>
      </div>
    </div>
  );
}

DocumentPreview.propTypes = {
  documentTypeId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default DocumentPreview;
