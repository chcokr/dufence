import {getNewGame} from './data';

import Firebase from 'firebase';
import qs from 'query-string';

const Baobab = require('baobab');

const firebaseRef = new Firebase('https://dufence.firebaseio.com');

const schools = [
  {
    id: '96180bde96c85a137b9bbee3ec833a28',
    name: 'Air Force',
    logoURL: require('./logos/air_force.png')
  },
  {
    id: '4c14d27f92a23d73664dd121828b0e6d',
    name: 'Boston',
    logoURL: require('./logos/boston.png')
  },
  {
    id: '5bbbbab73fcb9f841b662688be8ef3b7',
    name: 'Brandeis',
    logoURL: require('./logos/brandeis.png')
  },
  {
    id: 'ed63fc91500594c3086714f86b3001e4',
    name: 'Brown',
    logoURL: require('./logos/brown.png')
  },
  {
    id: '3f0dd6ee4cbc7933aa548933beecc9e4',
    name: 'Cal Tech',
    logoURL: require('./logos/caltech.png')
  },
  {
    id: '498c39cd37bf6c260b965367caf4c8fe',
    name: 'Cleveland St',
    logoURL: require('./logos/cleveland_st.png')
  },
  {
    id: '6a18ad0e45d92c984a952fe159d04d09',
    name: 'City NY',
    logoURL: require('./logos/city_college_of_ny.png')
  },
  {
    id: 'bc65f426282a1a198804b1d7602b25d4',
    name: 'Columbia',
    logoURL: require('./logos/columbia.png')
  },
  {
    id: '43a9616a147c80fbefdfe2dbc988896c',
    name: 'Cornell',
    logoURL: require('./logos/cornell.png')
  },
  {
    id: '444db2256aaa6ca07d1148828a1bfd67',
    name: 'Detroit Mercy',
    logoURL: require('./logos/detroit.png')
  },
  {
    id: 'ef440c917120850336638d82fb323826',
    name: 'F Dickinson',
    logoURL: require('./logos/farleigh_dickinson.png')
  },
  {
    id: '6808dd0e73ce8c42a097bc74c523775f',
    name: 'Harvard',
    logoURL: require('./logos/harvard.png')
  },
  {
    id: '06901723eb0db8de0719d64e816c374b',
    name: 'Haverford',
    logoURL: require('./logos/haverford.png')
  },
  {
    id: '5e409e09f43d85c6e61301149e4f803b',
    name: 'Hunter',
    logoURL: require('./logos/hunter.png')
  },
  {
    id: '96522838ec70e3dff89681a7a0b2f560',
    name: 'Johns Hopkins',
    logoURL: require('./logos/johns_hopkins.png')
  },
  {
    id: 'ce4bd51dc48091ddb7e42d5161ae307b',
    name: 'Lafayette',
    logoURL: require('./logos/duke.png')
  },
  {
    id: '27adb0b3f92d9b8f7fa4cb55b60114cc',
    name: 'Lawrence',
    logoURL: require('./logos/lawrence.png')
  },
  {
    id: '7abc1a233092fc104c7af72a89c0829c',
    name: 'MIT',
    logoURL: require('./logos/mit.png')
  },
  {
    id: '89dbc0c30c27a826ee9f65f2aabdb68c',
    name: 'NJIT',
    logoURL: require('./logos/njit.png')
  },
  {
    id: 'b6fb8bb4720cd209413bd2838531ca56',
    name: 'NYU',
    logoURL: require('./logos/nyu.png')
  },
  {
    id: '130c7ca8daccb66ef614ec3331a0f665',
    name: 'UNC',
    logoURL: require('./logos/unc.png')
  },
  {
    id: 'de398df78a0ddcf4d410c41544aa26f8',
    name: 'Northwestern',
    logoURL: require('./logos/northwestern.png')
  },
  {
    id: '2868c45828f1d11d82b5364e54164493',
    name: 'Notre Dame',
    logoURL: require('./logos/notre_dame.png')
  },
  {
    id: '8a816c3129a128dd79248e26ccd4547a',
    name: 'Ohio St',
    logoURL: require('./logos/ohio_st.png')
  },
  {
    id: '67d7f75fc8a73a5186bb3e1dc64d18e1',
    name: 'Penn St',
    logoURL: require('./logos/penn_st.png')
  },
  {
    id: '9d8f63a335335289bf4f4a330eafc64d',
    name: 'Princeton',
    logoURL: require('./logos/princeton.png')
  },
  {
    id: '8201fb620aa05b660c09b2a2ac6298a1',
    name: 'Queens',
    logoURL: require('./logos/queens_college.png')
  },
  {
    id: '9bd1bfc98a4ce4f61041711c478756f1',
    name: 'Sacred Heart',
    logoURL: require('./logos/sacred_heart.png')
  },
  {
    id: '78c7e74c6a285838dea4adc66563bd0c',
    name: 'St Francis',
    logoURL: require('./logos/st_francis_ny.png')
  },
  {
    id: '2ca60751d1e7be10fe662000c47ecc96',
    name: "St John's",
    logoURL: require('./logos/st_johns.png')
  },
  {
    id: '45ebe6bd838f67040a398bf6fd40841d',
    name: 'Stanford',
    logoURL: require('./logos/stanford.png')
  },
  {
    id: '19d4f503b9b6c7ec1f2a627a2e9d7139',
    name: 'Stevens Tech',
    logoURL: require('./logos/stevens_tech.png')
  },
  {
    id: '54026e80aeaf32220fe0b10441eaca0d',
    name: 'Temple',
    logoURL: require('./logos/temple.png')
  },
  {
    id: '4c486fcffd5a1f452d5f0cf58eb88f6e',
    name: 'Tufts',
    logoURL: require('./logos/tufts.png')
  },
  {
    id: 'aaa88e2fce232e0e772f4b0826dab10e',
    name: 'UCSD',
    logoURL: require('./logos/ucsd.png')
  },
  {
    id: '3bcae3162f73748824d193481c55df6d',
    name: 'U Penn',
    logoURL: require('./logos/penn.png')
  },
  {
    id: 'ed056567f65abc6216b034ae4230483b',
    name: 'Vassar',
    logoURL: require('./logos/vassar.png')
  },
  {
    id: '814375c279ccddf25c9310430696547a',
    name: 'Wayne St',
    logoURL: require('./logos/wayne_st.png')
  },
  {
    id: '6aa71d4cb62fb0fc841559898e7fda2f',
    name: 'Wellesley',
    logoURL: require('./logos/wellesley.png')
  },
  {
    id: '8313cfb88735f2109dd49e39e1345a67',
    name: 'Yale',
    logoURL: require('./logos/yale.png')
  },
  {
    id: 'e8453fe65843c0cfbfe2870dd1d7110c',
    name: 'Yeshiva',
    logoURL: require('./logos/yeshiva.png')
  }
];

export const SECRET_KEY_FOR_EDIT_ACCESS = 'cococoach';

const validateWeaponToScoresMap = (obj) => {
  let totalScoreOfGame = 0;

  for (let weaponType of Object.keys(obj)) {

    const leftRigthScorePair = obj[weaponType];
    const leftScore = leftRigthScorePair[0];
    const rightScore = leftRigthScorePair[1];

    totalScoreOfGame += (leftScore + rightScore);

    if (leftScore < 0 || rightScore < 0) {
      return new Error('Score cannot be negative.');
    }

    if (leftScore + rightScore > 9) {
      return new Error('For a weapon, the sum of scores can at most be 9.');
    }

  }

  if (totalScoreOfGame > 27) {
    return new Error('Total game score can at most be 27.');
  }
};

const appStateTree = new Baobab({
  canEdit: qs.parse(location.search)[SECRET_KEY_FOR_EDIT_ACCESS] !== undefined,
  dataReceivedYet: false,
  games: {},
  hideNavigation: false,
  schools: normalize(schools)
}, {
  validate: (prevState, newState) => {
    // Make sure we don't enter invalid score states.
    let {games} = newState;

    if (!games) {
      games = {};
    }

    for (let gameId of Object.keys(games)) {
      const game = games[gameId];

      if (game.men) {
        const menValidateResult = validateWeaponToScoresMap(game.men.scores);
        if (menValidateResult) {
          return menValidateResult;
        }
      }

      if (game.women) {
        const womenValidateResult =
          validateWeaponToScoresMap(game.women.scores);
        if (womenValidateResult) {
          return womenValidateResult;
        }
      }
    }
  }
});
export default appStateTree;

firebaseRef.on('value', snapshot => {
  const val = snapshot.val();

  appStateTree.set('dataReceivedYet', true);
  appStateTree.set('games', val.games || {});
});

appStateTree.on('update', e => {
  if (!appStateTree.get('dataReceivedYet')) {
    return;
  }

  const data = e.data.currentData;

  firebaseRef.set({
    games: data.games,
    schools: data.schools
  });
});

function normalize(arr) {
  let rtn = {};

  for (let item of arr) {
    rtn[item.id] = item;
  }

  return rtn;
}

function chooseRandomSchoolId() {
  return schools[Math.floor(Math.random() * schools.length)].id;
}
