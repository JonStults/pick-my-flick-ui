import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Form, Dropdown, Input, Button, Modal, Icon } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import {
    getMovies, enterMovie, createUserFlick,
    getRandomMovie, resetMessage, resetSelected
} from '../../store/movies/actionCreators';
import { RootState } from '../../store/rootState';
import { CreateMovieModel, MovieMetaData, RandomMovieModel } from '../../store/movies/types';
import { Messenger } from './Messenger';
import './Movies.scss';
import { GENRES } from '../../store/Constants';

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
    enterModalOpen: boolean;
    getMovieModalOpen: boolean;
    enterModalStep: number;
    getModalStep: number;
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
            enterModalOpen: false,
            getMovieModalOpen: false,
            enterModalStep: 1,
            getModalStep: 1,
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
        const { title, genre, randomCount, openModal, closedModals, enterModalStep, getModalStep, enterModalOpen, getMovieModalOpen } = this.state;
        return (
            <div className="flex-column home-container">
                <Modal className="enter-movie-modal" open={enterModalOpen}>
                    <div className="modal-content">
                        <Icon className="close-icon" name="close" onClick={() => this.setState({ enterModalOpen: false, enterModalStep: 1 })} />
                        <Form className="submit-movie-form">
                            {
                                enterModalStep === 1 &&
                                <div className="form-content">
                                    <Form.Field>
                                        <Input className="add-movie-input" placeholder="Enter Movie" value={title} onChange={(e: any) => this.setState({ title: e.target.value })} />
                                    </Form.Field>
                                    <Button type="submit" onClick={() => this.setState({ enterModalStep: 2 })}>Next</Button>
                                </div>
                            }
                            {
                                enterModalStep === 2 &&
                                <div className="form-content">
                                    <Form.Field>
                                        <Dropdown className="genre-dropdown" trigger={genre} placeholder="Genre">
                                            <Dropdown.Menu>
                                                {
                                                    GENRES.map((g: string) => {
                                                        return (
                                                            <Dropdown.Item onClick={() => { this.setState({ genre: g }) }} key={g}>{g}</Dropdown.Item>
                                                        )
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Form.Field>
                                    <Button type="submit" onClick={() => this.setState({ enterModalStep: 3 })}>Next</Button>
                                </div>
                            }
                            {
                                enterModalStep === 3 &&
                                <Button disabled={title.trim() === '' || genre === ''} type="submit" basic onClick={() => { this.props.enterMovie({ title: title, genre: genre }); this.setState({ title: '', genre: '' }) }}>Submit Movie</Button>
                            }
                        </Form>
                    </div>
                </Modal>
                <Modal className="enter-movie-modal" closeOnDimmerClick={true} open={getMovieModalOpen}>
                    <div className="modal-content">
                        <Icon className="close-icon" name="close" onClick={() => this.setState({ getMovieModalOpen: false, getModalStep: 1 })} />
                        {
                            getModalStep === 1 &&
                            <div className="form-content-two">
                                How many?
                                <Button onClick={() => this.setState({ randomCount: 1, getModalStep: 2 })}>1</Button>
                                <Button onClick={() => this.setState({ randomCount: 3, getModalStep: 2 })}>3</Button>
                                <Button onClick={() => this.setState({ randomCount: 5, getModalStep: 2 })}>5</Button>
                            </div>
                        }
                        {
                            getModalStep === 2 &&
                            <Button onClick={() => { this.setState({ getModalStep: 3 }); this.props.getRandomMovie(randomCount) }}>Get Movie(s)</Button>
                        }
                        {
                            getModalStep === 3 &&
                            <div className="movie-list">
                                {
                                    selectedMovies.map((s: RandomMovieModel, index: number) => {
                                        return (
                                            <div key={s.title} className="messenger" id={`messenger-${index}`}></div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </Modal>
                <Modal closeOnDimmerClick={true} onClose={this.props.resetMessage} open={surfaceMessage !== null}>
                    {surfaceMessage}
                    <Button onClick={this.props.resetMessage}>No</Button>
                    <Button onClick={() => this.props.createUserFlick(userId, metaData ? metaData.movieId : -1)}>Yes</Button>
                </Modal>
                <div className="flex-row random-movie">
                    <Button onClick={() => { this.setState({ enterModalOpen: true }) }} type="button" basic>Add Movie</Button>
                    <Button onClick={() => { this.setState({ getMovieModalOpen: true }) }} type="button" basic>Get Random {randomCount === 1 ? 'Movie' : 'Movies'}</Button>
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