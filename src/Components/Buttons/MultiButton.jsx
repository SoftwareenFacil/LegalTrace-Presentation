// MultiButton.jsx

// Internal imports
import EditButton from './EditButton';
import ViewButton from './ViewButton';
import DisableButton from './DisableButton';
import ViewCredentials from '../Modals/ViewCredentials';

// Styles imports
import '../../Style/MultiButton.css';


const MultiButton = ({ item, category, onFormSubmit, CustomModal }) => {
  return (
    <div className="multiButtonContainer">
      <div className="editButton">
        <EditButton
          data={item}
          onFormSubmit={onFormSubmit}
          category={category}
          CustomModal={CustomModal}
        />
      </div>
     <div className="viewDisableButtonsContainer">
        <div className="viewButton">
          {category !== 'credentials' ? (
            <ViewButton entity={item} category={category} />
          ) : (
            <ViewButton entity={item} category={category} CustomModal={ViewCredentials} />
          )}
        </div>
        <div className="disableButton">
          <DisableButton
            entity={item}
            onSubmit={onFormSubmit}
            category={category}
            usage={'table'}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiButton;
