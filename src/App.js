import React from "react"
import { useState } from "react"
import styled from "styled-components"

const events = [
  {
    name: "Kickback",
    month: 9,
    day: 3,
    todo: false,
    group: "Social",
    id: 0,
  },
  {
    name: "Book Airbnb for retreat",
    month: 9,
    day: 5,
    todo: true,
    group: "Social",
    id: 1,
  },
  {
    name: "GIM",
    month: 9,
    day: 6,
    todo: false,
    group: "General",
    id: 2,
  },
  {
    name: "Delibs",
    month: 9,
    day: 10,
    todo: false,
    group: "Exec",
    id: 3,
  },
  {
    name: "Book onboarding room",
    month: 9,
    day: 11,
    todo: true,
    group: "General",
    id: 4,
  },
  {
    name: "Onboarding",
    month: 9,
    day: 18,
    todo: false,
    group: "General",
    id: 6,
  },
  {
    name: "Social TBD",
    month: 9,
    day: 23,
    todo: false,
    group: "Social",
    id: 8,
  }
]

const groups = [
  {
    name: "Social",
    color: "#DB2B39",
    textColor: ""
  },
  {
    name: "General",
    color: "#F3A712",
    textColor: ""
  },
  {
    name: "Exec",
    color: "#3066BE",
    textColor: ""
  }
]

const Group = styled.div`
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
`

const Event = styled.div`
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
`

const Day = (props) => {
  const dayEvents = props.events.filter(e => e.day === props.day)

  return (
    <td>
      <p className="p-day">{props.day}</p>
      {dayEvents.map(e =>
        <Event className="event" key={e.id}
          backgroundColor={groups.find(g => g.name === e.group).color}
          textColor={groups.find(g => g.name === e.group).textColor}
          onClick={() => props.setModal(e)}>
          {e.todo
            ? <><input type="checkbox" id={e.id} /><label htmlFor={e.id}>{e.name}</label></>
            : <p>{e.name}</p>
          }
        </Event>
      )}
    </td>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [filterGroups, setFilterGroups] = useState([])
  const [modal, setModal] = useState(null)

  const filteredEvents = events.filter(
    e => e.name.toLowerCase().includes(filter.toLowerCase())
      || e.group.toLowerCase().includes(filter.toLowerCase())
  )

  const filterByGroup = (events) => {
    if (filterGroups.length === 0) {
      return events
    } else {
      return events.filter(e => filterGroups.includes(e.group))
    }
  }

  const septEvents = filterByGroup(filteredEvents).filter(e => e.month === 9)

  return (
    <>
      <h1>Calendar</h1>
      <h2>September</h2>
      <input
        className="search-bar"
        placeholder="Search (exact match)"
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>SUN</th>
            <th>MON</th>
            <th>TUES</th>
            <th>WED</th>
            <th>THURS</th>
            <th>FRI</th>
            <th>SAT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Day day={null} events={septEvents} />
            <Day day={null} events={septEvents} />
            <Day day={null} events={septEvents} />
            <Day day={null} events={septEvents} />
            <Day day={1} events={septEvents} />
            <Day day={2} events={septEvents} />
            <Day day={3} events={septEvents} modal={modal} setModal={setModal} />
          </tr>
          <tr>
            <Day day={4} events={septEvents} />
            <Day day={5} events={septEvents} />
            <Day day={6} events={septEvents} modal={modal} setModal={setModal} />
            <Day day={7} events={septEvents} />
            <Day day={8} events={septEvents} />
            <Day day={9} events={septEvents} />
            <Day day={10} events={septEvents} modal={modal} setModal={setModal} />
          </tr>
          <tr>
            <Day day={11} events={septEvents} />
            <Day day={12} events={septEvents} />
            <Day day={13} events={septEvents} />
            <Day day={14} events={septEvents} />
            <Day day={15} events={septEvents} />
            <Day day={16} events={septEvents} />
            <Day day={17} events={septEvents} />
          </tr>
          <tr>
            <Day day={18} events={septEvents} modal={modal} setModal={setModal} />
            <Day day={19} events={septEvents} />
            <Day day={20} events={septEvents} />
            <Day day={21} events={septEvents} />
            <Day day={22} events={septEvents} />
            <Day day={23} events={septEvents} modal={modal} setModal={setModal} />
            <Day day={24} events={septEvents} />
          </tr>
          <tr>
            <Day day={25} events={septEvents} />
            <Day day={26} events={septEvents} />
            <Day day={27} events={septEvents} />
            <Day day={28} events={septEvents} />
            <Day day={29} events={septEvents} />
            <Day day={30} events={septEvents} />
            <Day day={null} events={septEvents} />
          </tr>
        </tbody>
      </table>
      <div className="groups">
        {groups.map(g =>
          <Group className="group" key={g.name}
            // Add or remove group to filterGroups when clicked
            onClick={() => {
              if (!filterGroups.includes(g.name)) {
                setFilterGroups(filterGroups.concat(g.name))
              } else {
                setFilterGroups(filterGroups.filter(fg => fg !== g.name))
              }
            }}
            backgroundColor={g.color} textColor={g.textColor}>
            {g.name}
            {filterGroups.includes(g.name) ? " X" : ""}
          </Group>
        )}
      </div>
      {modal ?
        <>
          <div className="modal-screen" onClick={() => setModal(null)} />
          <div className="modal">
            {modal.month}/{modal.day}
            <h2>{modal.name}</h2>
            {modal.group}
          </div>
        </> :
        null
      }
    </>
  )
}

export default App