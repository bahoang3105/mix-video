import GroupOfLayers from './GroupOfLayers';

const Group = (props) => {
  return(
    <div onClick={() => props.addLayer('group')}>
      <GroupOfLayers name='Group of layers' />
    </div>
  );
};

export default Group;