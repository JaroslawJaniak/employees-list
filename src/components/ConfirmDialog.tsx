import { useTranslation } from "react-i18next";

export interface ConfirmDialogProps {
    show: boolean;
    title: string;
    description: string;
    onConfirm: (event: React.MouseEvent) => void;
    onCancel: (event: React.MouseEvent) => void;
}

export function ConfirmDialog({ show, onConfirm, onCancel, title, description } : ConfirmDialogProps) {
    const { t } = useTranslation();
    
    return (
      <>
        <div
          className={"fixed left-0 top-0 bg-white" + (show ? " block" : " hidden")}
          tabIndex={-1}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  onClick={onCancel}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>{description}</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={onCancel}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={onConfirm}
                  type="button"
                  className="btn btn-primary"
                >
                  {t("yes")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}