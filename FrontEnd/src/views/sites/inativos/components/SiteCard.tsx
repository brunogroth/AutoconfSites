import React from 'react';
import './SiteCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faMoneyBill, faMoneyBillTransfer, faMoneyBillWave, faMoneyCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

interface SiteCardProps {
  
  name: string;
  id: number;
  url: string;
  createdAt: string;
  disableAt: string;
  status: number;
  timeRemaining: string;
  statusColorIndicator: string;
  onEdit: () => void;
  onRestore: () => void;
  onDelete: () => void;
}

const SiteCard: React.FC<SiteCardProps> = ({
  name,
  id,
  url,
  createdAt,
  disableAt,
  status,
  timeRemaining,
  statusColorIndicator,
  onEdit,
  onRestore,
  onDelete,
}) => {
  return (
    <div className="col-3">
      <div className="card site-card" style={{'borderTop': `7px solid ${statusColorIndicator}` }}>
        
        <div className="card-body">
          <h5 className="card-title site-card-title">
            {name} - #{id}
          </h5>
          <p className="card-text site-card-text">
            <strong>URL:</strong> {url}
          </p>
          <p className="card-text site-card-text">
            <strong>Criado em:</strong> {createdAt}
          </p>
          <p className="card-text site-card-text">
            <strong>Desativar em:</strong> {disableAt}
          </p>
          <p className="card-text site-card-text">
            <strong>Status:</strong> {status}
          </p>
          <p className="card-text site-card-text">
            <strong>Tempo restante:</strong> {timeRemaining}
          </p>
          <div className="position-absolute top-0 end-0 mt-3 me-3">
            <button className="btn btn-success" onClick={onRestore}>
              <FontAwesomeIcon icon={faMoneyBillTransfer} />
            </button>
          </div>
          <div className="site-card-actions">
            <button className="btn btn-outline-danger" onClick={onDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="btn btn-primary" onClick={onEdit}>
              <FontAwesomeIcon icon={faEdit} /> Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;