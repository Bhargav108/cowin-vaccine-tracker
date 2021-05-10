import React from 'react'

export default function Centers(props) {
  return (
    <>
      {
        props.centers && props.centers.length ?
        <section className='centers'>
          {props.centers.map((center) =>
            <div key={center.center_id} className="center-item">
              <span className="center-name">{center.name}, {center.state_name}</span>
              <span className="">[{center.fee_type}]</span>
              <table className="center-detail-table">
                <thead className="table-head">
                  <tr>
                    <th>Date</th>
                    <th>Available</th>
                    <th>Age</th>
                    <th>Vaccine</th>
                  </tr>
                </thead>
                <tbody>
                  {center.sessions.map((session) =>
                    <tr key={session.session_id}>
                      <td>{session.date}</td>
                      <td className={session.available_capacity > 0 ? 'available' : 'not-available'}>{session.available_capacity}</td>
                      <td>{session.min_age_limit}+</td>
                      <td>{session.vaccine}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
        :
        <div className="center-section"><span>No centers available</span></div>
      }
    </>
  )
}
