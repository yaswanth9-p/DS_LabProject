import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { PortalProvider, usePortal } from '@/data/portal';

describe('Student profile updates', () => {
  beforeEach(() => localStorage.clear());

  it('uses the supplied student details and social profiles', async () => {
    const { result } = renderHook(() => usePortal(), { wrapper: PortalProvider });
    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(result.current.profile.name).toBe('P YASWANTH');
    expect(result.current.profile.studentId).toBe('24102A030093');
    expect(result.current.profile.semester).toBe('5th semester');
    expect(result.current.profile.github).toBe('https://github.com/yaswanth9-p');
    expect(result.current.profile.photo).toContain('/__l5e/assets-v1/');
  });

  it('replaces saved placeholders without losing personal edits', async () => {
    localStorage.setItem('mbu-profile', JSON.stringify({ name: '[YOUR NAME]', studentId: '[YOUR STUDENT ID]', branch: 'CSE – Data Science', photo: '', leetcode: 'https://leetcode.com/u/student/' }));
    const { result } = renderHook(() => usePortal(), { wrapper: PortalProvider });
    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(result.current.profile.name).toBe('P YASWANTH');
    expect(result.current.profile.branch).toBe('Data Science');
    expect(result.current.profile.leetcode).toBe('https://leetcode.com/u/student/');
    act(() => { result.current.saveProfile({ ...result.current.profile, className: 'DS2 Updated' }); });
    expect(JSON.parse(localStorage.getItem('mbu-profile') || '{}').className).toBe('DS2 Updated');
  });

  it('keeps custom experiments when replacing legacy samples', async () => {
    localStorage.setItem('mbu-experiments', JSON.stringify([{ id: 'led-blinking', demo: true }, { id: 'student-project', title: 'Student project', number: '04', status: 'In progress' }]));
    const { result } = renderHook(() => usePortal(), { wrapper: PortalProvider });
    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(result.current.experiments.some(e => e.id === 'led-blinking')).toBe(false);
    expect(result.current.experiments.some(e => e.id === 'student-project')).toBe(true);
    expect(result.current.experiments.length).toBeGreaterThan(1);
  });
});