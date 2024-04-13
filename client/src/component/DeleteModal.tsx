import { Button, Modal } from "antd";

const CsDeleteConfirmation = ({
  visible,
  handleDelete,
  handleCancel,
  deleteBtnName,
  cancelBtnName,
  confirmMessage,
}: any) => {
  return (
    <>
      <Modal
        title="Delete Confirmation"
        open={visible}
        onOk={handleDelete}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleDelete}>
            {deleteBtnName}
          </Button>,
          <Button className="cancel-btn-edit" key="back" onClick={handleCancel}>
            {cancelBtnName}
          </Button>,
        ]}
      >
        <p>{confirmMessage}</p>
      </Modal>
    </>
  );
};

CsDeleteConfirmation.defaultProps = {
  deleteBtnName: "Delete",
  cancelBtnName: "Cancel",
};

export default CsDeleteConfirmation;
