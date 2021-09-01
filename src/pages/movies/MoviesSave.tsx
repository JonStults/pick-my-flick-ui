import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Form, Dropdown, Input, Button, Modal } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import {
    getMovies, enterMovie, createUserFlick,
    getRandomMovie, resetMessage, resetSelected
} from '../../store/movies/actionCreators';
import { RootState } from '../../store/rootState';
import { CreateMovieModel, MovieMetaData, RandomMovieModel } from '../../store/movies/types';
import { Messenger } from './Messenger';
import './Movies.scss';

interface MoviesProps {
    genres: string[];
    selectedMovies: RandomMovieModel[];
    surfaceMessage: string;
    metaData: MovieMetaData | null;
    userId: number;
    getMovies: () => void;
    resetMessage: () => void;
    resetSelected: () => void;
    createUserFlick: (userId: number, movieId: number) => void;
    getRandomMovie: (num: number) => void;
    enterMovie: (data: CreateMovieModel) => void;
}

interface MoviesState {
    title: string,
    genre: string,
    randomCount: number;
    openModal: number;
    closedModals: number[];
    timeout: any;
}

class Movies extends React.Component<MoviesProps, MoviesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            genre: '',
            randomCount: 1,
            openModal: 0,
            closedModals: [],
            timeout: 0
        }
    }
    componentDidMount() {
        this.props.getMovies();
    }
    componentDidUpdate(prevProps: Readonly<MoviesProps>) {
        const { selectedMovies } = this.props;
        if (prevProps.selectedMovies !== selectedMovies) {
            selectedMovies.forEach((s: RandomMovieModel, index: number) => {
                return new Messenger(`messenger-${index}`, [s.title])
            })
        }
    }
    render() {
        const { genres, selectedMovies, surfaceMessage, userId, metaData } = this.props;
        const { title, genre, randomCount, openModal, closedModals } = this.state;
        return (
            <div className="flex-column home-container">
                <Form className="submit-movie-form">
                    <div className="flex-row">
                        <Form.Field>
                            <Input className="add-movie-input" placeholder="Movie" value={title} onChange={(e: any) => this.setState({ title: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown className="genre-dropdown" trigger={genre} placeholder="Genre">
                                <Dropdown.Menu>
                                    {
                                        genres.map((g: string) => {
                                            return (
                                                <Dropdown.Item onClick={() => { this.setState({ genre: g }) }} key={g}>{g}</Dropdown.Item>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Field>
                    </div>
                    <Button disabled={title.trim() === '' || genre === ''} type="submit" basic onClick={() => { this.props.enterMovie({ title: title, genre: genre }); this.setState({ title: '', genre: '' }) }}>Submit Movie</Button>
                </Form>
                <div className="flex-row random-movie">
                    <Button onClick={() => { this.setState({ openModal: 1 }) }} type="button" basic>Get Random {randomCount === 1 ? 'Movie' : 'Movies'}</Button>
                </div>
                <Modal closeOnDimmerClick={true} onClose={this.props.resetMessage} open={surfaceMessage !== null}>
                    {surfaceMessage}
                    <Button onClick={this.props.resetMessage}>No</Button>
                    <Button onClick={() => this.props.createUserFlick(userId, metaData ? metaData.movieId : -1)}>Yes</Button>
                </Modal>
                <div style={{ opacity: openModal === 0 ? 0 : 1 }} className={classNames("modal-animation modal-1 flex-column", {
                    'move-center': openModal === 1,
                    'move-left': closedModals.includes(1)
                })}>
                    How many?
                    <Button onClick={() => this.setState({ randomCount: 1, openModal: 2, closedModals: [...closedModals, 1] })}>1</Button>
                    <Button onClick={() => this.setState({ randomCount: 3, openModal: 2, closedModals: [...closedModals, 1] })}>3</Button>
                    <Button onClick={() => this.setState({ randomCount: 5, openModal: 2, closedModals: [...closedModals, 1] })}>5</Button>
                </div>
                <div style={{ opacity: openModal === 0 ? 0 : 1 }} onClick={() => this.setState({ openModal: 3, closedModals: [...closedModals, 2] })} className={classNames("modal-animation modal-2 flex-column", {
                    'move-center': openModal === 2,
                    'move-left': closedModals.includes(2)
                })}>
                    <Button onClick={() => this.props.getRandomMovie(randomCount)}>Get</Button>
                </div>
                <div style={{ opacity: openModal === 0 ? 0 : 1 }}
                    className={classNames("modal-animation modal-3 messenger-container flex-column", {
                        'move-center': openModal === 3,
                        'move-left': closedModals.includes(3)
                    })}>
                    {
                        selectedMovies.map((s: RandomMovieModel, index: number) => {
                            return (
                                <div key={s.title} className="messenger" id={`messenger-${index}`}></div>
                            )
                        })
                    }
                    <Button onClick={() => {
                        this.props.resetSelected(); this.setState({
                            openModal: 0, closedModals: [...closedModals, 3],
                            timeout: setTimeout(() => { this.setState({ closedModals: [] }) }, 500)
                        });
                    }}>close</Button>
                    <Button onClick={() => this.props.getRandomMovie(randomCount)}>select another</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        genres: state.MoviesState.genres,
        selectedMovies: state.MoviesState.selectedMovies,
        surfaceMessage: state.MoviesState.surfaceMessage,
        metaData: state.MoviesState.metaData,
        userId: state.AuthState.user.id
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getMovies, enterMovie, getRandomMovie, resetMessage, createUserFlick, resetSelected
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);