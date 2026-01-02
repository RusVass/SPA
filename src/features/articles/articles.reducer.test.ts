import { describe, it, expect } from 'vitest'
import { reducer, initialState, type ArticlesAction } from './articles.reducer'
import type { Article } from './articles.types'

describe('articles reducer', () => {
  it('should return initial state when called with initial state', () => {
    expect(reducer(initialState, { type: 'LOAD_START' })).not.toBe(initialState)
    expect(reducer(initialState, { type: 'SET_QUERY', query: 'test' }).query).toBe('test')
  })

  it('should handle LOAD_START', () => {
    const action: ArticlesAction = { type: 'LOAD_START' }
    const result = reducer(initialState, action)

    expect(result.isLoading).toBe(true)
    expect(result.error).toBe(null)
    expect(result.articles).toEqual([])
    expect(result.query).toBe('')
  })

  it('should handle LOAD_SUCCESS', () => {
    const articles: Article[] = [{ id: 1, title: 'Test Article' } as Article]
    const action: ArticlesAction = { type: 'LOAD_SUCCESS', articles }
    const result = reducer({ ...initialState, isLoading: true }, action)

    expect(result.isLoading).toBe(false)
    expect(result.articles).toEqual(articles)
    expect(result.error).toBe(null)
  })

  it('should handle LOAD_ERROR', () => {
    const errorMessage = 'Network error'
    const action: ArticlesAction = { type: 'LOAD_ERROR', message: errorMessage }
    const result = reducer({ ...initialState, isLoading: true }, action)

    expect(result.isLoading).toBe(false)
    expect(result.error).toBe(errorMessage)
    expect(result.articles).toEqual([])
  })

  it('should handle SET_QUERY', () => {
    const query = 'test search'
    const action: ArticlesAction = { type: 'SET_QUERY', query }
    const result = reducer(initialState, action)

    expect(result.query).toBe(query)
    expect(result.articles).toEqual([])
    expect(result.isLoading).toBe(false)
    expect(result.error).toBe(null)
  })

  it('should throw error for unhandled action', () => {
    const action = { type: 'UNKNOWN_ACTION' } as unknown as ArticlesAction

    expect(() => reducer(initialState, action)).toThrow('Unhandled action')
  })
})
