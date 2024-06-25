// MultiButton.jsx

// import { Button } from 'react-bootstrap';
// Internal imports
import EditButton from './EditButton';
import ViewButton from './ViewButton';
import DisableButton from './DisableButton';
import ViewCredentials from '../Modals/ViewCredentials';

// import { getUsers } from '../../Utils/getEntity.js';
// Styles imports
import '../../Style/Buttons/MultiButton.scss';
import Download from './Download';


const MultiButton = ({ item, category, onFormSubmit, CustomModal }) => {

  // const handleClick = async () => {
  //   const date = item.created;
  //   const response = await getUsers({created: date});
  //   console.log(response);
  // };
  return (
    <div className="multiButtonContainer">
        {category !== 'tasks'?
          <>
            <div className="button-with-line">
            </div>
            <EditButton
              data={item}
              onFormSubmit={onFormSubmit}
              category={category}
              CustomModal={CustomModal}
              className="table-edit-button-vertical"
            />
          </>
          :
          null
        }
     <div className="viewDisableButtonsContainer">
        <div className="rightButtons">
          {category !== 'credentials'&&category!=='payments' ? (
            <ViewButton entity={item} category={category} />
          ) : ((category!=='payments')?
            (<ViewButton entity={item} category={category} CustomModal={ViewCredentials} />):(<Download {...item}/>)
          )}
        </div>
        <div className="rightButtons">
          {category === 'tasks'?
            <EditButton
              data={item}
              onFormSubmit={onFormSubmit}
              category={category}
              CustomModal={CustomModal}
              className="table-edit-button-horizontal"
            />
            :
            <DisableButton
              entity={item}
              onSubmit={onFormSubmit}
              category={category}
              usage={'table'}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default MultiButton;
