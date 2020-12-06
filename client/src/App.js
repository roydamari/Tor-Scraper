import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Button from '@material-ui/core/Button';
import SimpleCard from "./components/SimpleCard";
import Chips from "./components/Chip";
import Load from "./components/Load";


function App() {

  const [pastes, setPastes] = useState([])
  const [offset, setOffset] = useState(10);
  const [noMore, setNoMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false)

  const updateSearchText = (e) => {
    if (e.target) setSearchText(e.target.value);
    else setSearchText(e);
  }

  useEffect(() => {
    setOffset(10);
    if (searchText) {
      fetch(`api/search/?search=${searchText}&offset=${0}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.error === "No more pastes") {
            setNoMore(true)
            setPastes([])
          } else {
            if (data.length < 10)
              setNoMore(true)
            else
              setNoMore(false)
            setPastes(data)
          }
        });
    } else {
      setNoMore(false)
      fetch(`api/pastes`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => setPastes(data));
    }
  }, [searchText])


  const LoadMore = () => {
    setLoading(true);
    if (!noMore) {
      if (searchText) {
        fetch(`api/search/?search=${searchText}&offset=${offset}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            setLoading(false);
            if (data.error === "No more pastes") {
              setNoMore(true)
            } else {
              if (data.length < 10)
                setNoMore(true)
              else
                setNoMore(false)
              setPastes(prevState => prevState.concat(data));
              setOffset(prevState => prevState + 10);
            }
          });
      } else {
        fetch(`api/pastes/?offset=${offset}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            setLoading(false);
            console.log(data);
            if (data.error === "No more pastes") {
              setNoMore(true)
            } else {
              if (data.length < 10)
                setNoMore(true)
              else
                setNoMore(false)
              setPastes(prevState => prevState.concat(data));
              setOffset(prevState => prevState + 10);
            }
          });
      }
    }
  }

  useEffect(() => {
    (async function fetchData() {
      fetch('api/pastes', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => setPastes(data));
      fetch('api/pastes/update', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => console.log(data));
    })();
  }, [])


  return (
    <div style={{ margin: '-8px', overflow: 'hidden', marginBottom: '15px' }}>
      <Navbar updateSearchText={updateSearchText} searchText={searchText} />
      <Chips updateSearchText={updateSearchText} />
      <div style={{ marginTop: '15px' }}>
        {pastes.map(paste => {
          return <SimpleCard title={paste.title} content={paste.content} user={paste.user} date={paste.date} key={paste.date} />
        })}
      </div>
      <div style={{ width: '100vw', display: 'flex' }}>
        {!noMore ? (!loading && pastes.length > 0) ? <Button variant="contained" color="primary" style={{ margin: 'auto', marginTop: '15px', borderRadius: '10px' }} onClick={LoadMore}>
          Load More
      </Button> : <Load /> : null}
      </div>
    </div >
  );
}

export default App;

