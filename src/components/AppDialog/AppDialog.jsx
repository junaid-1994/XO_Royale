import './AppDialog.css';

export default function AppDialog(props){
    return (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
            {props.children}
        </div>
    );
}